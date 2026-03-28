import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import {
  HorarioAulaConfiguracao,
  type IHorarioAulaConfiguracaoDomain,
} from "../domain/horario-aula-configuracao";
import type {
  HorariosDeAulaFindAtualQuery,
  HorariosDeAulaFindAtualQueryResult,
} from "../domain/queries";
import type { IHorarioAulaConfiguracaoRepository } from "../domain/repositories/horario-aula-configuracao.repository.interface";
import { HorarioAulaConfiguracaoEntity } from "./typeorm/horario-aula-configuracao.typeorm.entity";
import { HorarioAulaConfiguracaoItemEntity } from "./typeorm/horario-aula-configuracao-item.typeorm.entity";

@DeclareImplementation()
export class HorarioAulaConfiguracaoTypeOrmRepositoryAdapter
  implements IHorarioAulaConfiguracaoRepository
{
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
  ) {}

  // ============================================================================
  // Write side
  // ============================================================================

  async findActiveByCampusId(campusId: string): Promise<HorarioAulaConfiguracao | null> {
    const repo = this.appTypeormConnection.getRepository(HorarioAulaConfiguracaoEntity);
    const entity = await repo.findOne({
      where: { ativo: true, campus: { id: campusId } },
      relations: { campus: true },
    });
    if (!entity) return null;

    return HorarioAulaConfiguracao.load(await this.toDomainData(entity));
  }

  async saveConfig(aggregate: HorarioAulaConfiguracao): Promise<void> {
    const repo = this.appTypeormConnection.getRepository(HorarioAulaConfiguracaoEntity);

    const entity = repo.create({
      id: aggregate.id,
      dataInicio: aggregate.dataInicio,
      dataFim: aggregate.dataFim,
      ativo: aggregate.ativo,
    });
    Object.assign(entity, { campus: { id: aggregate.campus.id } });
    await repo.save(entity);
  }

  async saveNew(aggregate: HorarioAulaConfiguracao): Promise<void> {
    await this.saveConfig(aggregate);
    await this.createItems(aggregate.id, aggregate.horarios);
  }

  // ============================================================================
  // Read side
  // ============================================================================

  async getFindAtualQueryResult(
    _accessContext: IAccessContext | null,
    query: HorariosDeAulaFindAtualQuery,
  ): Promise<HorariosDeAulaFindAtualQueryResult> {
    const itemRepo = this.appTypeormConnection.getRepository(HorarioAulaConfiguracaoItemEntity);
    const configRepo = this.appTypeormConnection.getRepository(HorarioAulaConfiguracaoEntity);

    const config = await configRepo.findOne({
      where: { ativo: true, campus: { id: query.campusId } },
    });

    if (!config) {
      return { data: [] };
    }

    const items = await itemRepo.find({
      where: { horarioAulaConfiguracao: { id: config.id } },
      order: { inicio: "ASC" },
    });

    return {
      data: items.map((h) => ({ inicio: h.inicio, fim: h.fim })),
    };
  }

  // ============================================================================
  // Mappers privados
  // ============================================================================

  private async toDomainData(
    entity: HorarioAulaConfiguracaoEntity,
  ): Promise<IHorarioAulaConfiguracaoDomain> {
    const itemRepo = this.appTypeormConnection.getRepository(HorarioAulaConfiguracaoItemEntity);
    const items = await itemRepo.find({
      where: { horarioAulaConfiguracao: { id: entity.id } },
      order: { inicio: "ASC" },
    });

    return {
      id: entity.id,
      dataInicio: entity.dataInicio,
      dataFim: entity.dataFim,
      ativo: entity.ativo,
      campus: { id: entity.campus?.id },
      horarios: items.map((h) => ({
        inicio: h.inicio,
        fim: h.fim,
      })),
    };
  }

  // ============================================================================
  // Items (value objects do aggregate — append-only)
  // ============================================================================

  private async createItems(
    configuracaoId: string,
    horarios: Array<{ inicio: string; fim: string }>,
  ): Promise<void> {
    const itemRepo = this.appTypeormConnection.getRepository(HorarioAulaConfiguracaoItemEntity);

    for (const h of horarios) {
      const entity = new HorarioAulaConfiguracaoItemEntity();
      entity.id = generateUuidV7();
      entity.inicio = h.inicio;
      entity.fim = h.fim;
      Object.assign(entity, { horarioAulaConfiguracao: { id: configuracaoId } });
      await itemRepo.save(entity);
    }
  }
}
