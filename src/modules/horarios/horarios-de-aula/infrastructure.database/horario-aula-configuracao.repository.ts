import type { FindOptionsWhere } from "typeorm";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import { TurmaHorarioAulaEntity } from "@/modules/horarios/turma-horario-aula/infrastructure.database/typeorm/turma-horario-aula.typeorm.entity";
import {
  HorarioAulaConfiguracao,
  type IHorarioAulaConfiguracaoDomain,
} from "../domain/horario-aula-configuracao";
import type {
  HorariosDeAulaFindAtualQuery,
  HorariosDeAulaFindAtualQueryResult,
} from "../domain/queries";
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

  // ============================================================================
  // Read side
  // ============================================================================

  async getFindAtualQueryResult(
    _accessContext: IAccessContext | null,
    query: HorariosDeAulaFindAtualQuery,
  ): Promise<HorariosDeAulaFindAtualQueryResult> {
    const horarioRepo = this.appTypeormConnection.getRepository(HorarioAulaEntity);
    const configRepo = this.appTypeormConnection.getRepository(HorarioAulaConfiguracaoEntity);

    const config = await configRepo.findOne({
      where: { ativo: true, campus: { id: query.campusId } },
    });

    if (!config) {
      return { data: [] };
    }

    const horarios = await horarioRepo.find({
      where: { horarioAulaConfiguracao: { id: config.id } },
      order: { inicio: "ASC" },
    });

    return {
      data: horarios.map((h) => ({ inicio: h.inicio, fim: h.fim })),
    };
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

    return {
      id: entity.id,
      dataInicio: entity.dataInicio,
      dataFim: entity.dataFim,
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
    const horarioRepo = this.appTypeormConnection.getRepository(HorarioAulaEntity);
    const turmaHorarioRepo = this.appTypeormConnection.getRepository(TurmaHorarioAulaEntity);

    // Buscar IDs dos horarios atuais para limpar dependencias
    const currentHorarios = await horarioRepo.find({
      where: { horarioAulaConfiguracao: { id: configuracaoId } },
      select: ["id"],
    });

    // Deletar turma_horario_aula dependentes antes de deletar horario_aula
    for (const h of currentHorarios) {
      await turmaHorarioRepo.delete({
        horarioAula: { id: h.id },
      } as FindOptionsWhere<TurmaHorarioAulaEntity>);
    }

    await horarioRepo.delete({
      horarioAulaConfiguracao: { id: configuracaoId },
    } as FindOptionsWhere<HorarioAulaEntity>);

    for (const h of horarios) {
      const entity = new HorarioAulaEntity();
      entity.id = generateUuidV7();
      entity.inicio = h.inicio;
      entity.fim = h.fim;
      Object.assign(entity, { horarioAulaConfiguracao: { id: configuracaoId } });
      await horarioRepo.save(entity);
    }
  }
}
