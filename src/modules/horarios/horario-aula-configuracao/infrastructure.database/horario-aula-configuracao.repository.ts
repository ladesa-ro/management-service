import type { FindOptionsWhere } from "typeorm";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import {
  HorarioAulaConfiguracao,
  type IHorarioAulaConfiguracaoDomain,
} from "../domain/horario-aula-configuracao";
import type { IHorarioAulaConfiguracaoRepository } from "../domain/repositories/horario-aula-configuracao.repository.interface";
import { HorarioAulaEntity } from "./typeorm/horario-aula.typeorm.entity";
import { HorarioAulaConfiguracaoEntity } from "./typeorm/horario-aula-configuracao.typeorm.entity";

@DeclareImplementation()
export class HorarioAulaConfiguracaoTypeOrmRepositoryAdapter
  implements IHorarioAulaConfiguracaoRepository
{
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
  ) {}

  async loadById(id: string): Promise<HorarioAulaConfiguracao | null> {
    const repo = this.appTypeormConnection.getRepository(HorarioAulaConfiguracaoEntity);
    const entity = await repo.findOneBy({ id });
    if (!entity) return null;

    return HorarioAulaConfiguracao.load(await this.toDomainData(entity));
  }

  async findAll(where?: Record<string, unknown>): Promise<HorarioAulaConfiguracao[]> {
    const repo = this.appTypeormConnection.getRepository(HorarioAulaConfiguracaoEntity);
    const entities = await repo.find({
      where,
      order: { dataInicio: "ASC" },
    });

    return Promise.all(
      entities.map(async (e) => HorarioAulaConfiguracao.load(await this.toDomainData(e))),
    );
  }

  async save(aggregate: HorarioAulaConfiguracao): Promise<void> {
    const repo = this.appTypeormConnection.getRepository(HorarioAulaConfiguracaoEntity);

    const entity = repo.create({
      id: aggregate.id,
      dataInicio: aggregate.dataInicio,
      dataFim: aggregate.dataFim,
      ativo: aggregate.ativo,
    });
    Object.assign(entity, { campus: { id: aggregate.campus.id } });
    await repo.save(entity);

    await this.replaceHorarios(aggregate.id, aggregate.horarios);
  }

  async remove(id: string): Promise<void> {
    const horarioRepo = this.appTypeormConnection.getRepository(HorarioAulaEntity);
    await horarioRepo.delete({
      horarioAulaConfiguracao: { id },
    } as FindOptionsWhere<HorarioAulaEntity>);

    const repo = this.appTypeormConnection.getRepository(HorarioAulaConfiguracaoEntity);
    await repo.delete(id);
  }

  // ============================================================================
  // Mappers privados
  // ============================================================================

  private async toDomainData(
    entity: HorarioAulaConfiguracaoEntity,
  ): Promise<IHorarioAulaConfiguracaoDomain> {
    const horarioRepo = this.appTypeormConnection.getRepository(HorarioAulaEntity);
    const horarios = await horarioRepo.find({
      where: { horarioAulaConfiguracao: { id: entity.id } },
      order: { inicio: "ASC" },
    });

    const formatDate = (d: string | null) => {
      if (!d) return null;
      return String(d);
    };

    return {
      id: entity.id,
      dataInicio: formatDate(entity.dataInicio) ?? "",
      dataFim: formatDate(entity.dataFim),
      ativo: entity.ativo,
      campus: { id: entity.campus?.id },
      horarios: horarios.map((h) => ({
        inicio: h.inicio,
        fim: h.fim,
      })),
    };
  }

  // ============================================================================
  // Horários (value objects do aggregate)
  // ============================================================================

  private async replaceHorarios(
    configuracaoId: string,
    horarios: Array<{ inicio: string; fim: string }>,
  ): Promise<void> {
    const repo = this.appTypeormConnection.getRepository(HorarioAulaEntity);

    await repo.delete({
      horarioAulaConfiguracao: { id: configuracaoId },
    } as FindOptionsWhere<HorarioAulaEntity>);

    for (const h of horarios) {
      const entity = new HorarioAulaEntity();
      entity.id = generateUuidV7();
      entity.inicio = h.inicio;
      entity.fim = h.fim;
      Object.assign(entity, { horarioAulaConfiguracao: { id: configuracaoId } });
      await repo.save(entity);
    }
  }
}
