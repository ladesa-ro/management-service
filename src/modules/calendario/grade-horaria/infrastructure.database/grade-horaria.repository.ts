import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import { GradeHoraria, type IGradeHorariaDomain } from "../domain/grade-horaria";
import type {
  GradeHorariaFindByCampusQuery,
  GradeHorariaFindByCampusQueryResult,
} from "../domain/queries";
import type { IGradeHorariaRepository } from "../domain/repositories/grade-horaria.repository.interface";
import { GradeHorariaEntity } from "./typeorm/grade-horaria.typeorm.entity";
import { GradeHorariaIntervaloEntity } from "./typeorm/grade-horaria-intervalo.typeorm.entity";

@Impl()
export class GradeHorariaTypeOrmRepositoryAdapter implements IGradeHorariaRepository {
  constructor(
    @Dep(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
  ) {}

  // ============================================================================
  // Write side
  // ============================================================================

  async findAllActiveByCampusId(campusId: string): Promise<GradeHoraria[]> {
    const repo = this.appTypeormConnection.getRepository(GradeHorariaEntity);
    const entities = await repo.find({
      where: { ativo: true, campus: { id: campusId } },
      relations: { campus: true },
    });

    const grades: GradeHoraria[] = [];
    for (const entity of entities) {
      grades.push(GradeHoraria.load(await this.toDomainData(entity)));
    }
    return grades;
  }

  async saveConfig(aggregate: GradeHoraria): Promise<void> {
    const repo = this.appTypeormConnection.getRepository(GradeHorariaEntity);

    const entity = repo.create({
      id: aggregate.id,
      identificadorExterno: aggregate.identificadorExterno,
      nome: aggregate.nome,
      dataInicio: aggregate.dataInicio,
      dataFim: aggregate.dataFim,
      ativo: aggregate.ativo,
      version: aggregate.version,
      previousVersionId: aggregate.previousVersionId,
      validFrom: aggregate.validFrom,
      validTo: aggregate.validTo,
      dateCreated: aggregate.dateCreated,
      dateUpdated: aggregate.dateUpdated,
      dateDeleted: aggregate.dateDeleted,
    });
    Object.assign(entity, { campus: { id: aggregate.campus.id } });
    await repo.save(entity);
  }

  async saveNew(aggregate: GradeHoraria): Promise<void> {
    await this.saveConfig(aggregate);
    await this.createIntervalos(aggregate.id, aggregate.intervalos);
  }

  // ============================================================================
  // Read side
  // ============================================================================

  async getFindByCampusQueryResult(
    _accessContext: IAccessContext | null,
    query: GradeHorariaFindByCampusQuery,
  ): Promise<GradeHorariaFindByCampusQueryResult> {
    const configRepo = this.appTypeormConnection.getRepository(GradeHorariaEntity);
    const itemRepo = this.appTypeormConnection.getRepository(GradeHorariaIntervaloEntity);

    const configs = await configRepo.find({
      where: { ativo: true, campus: { id: query.campusId } },
      order: { nome: "ASC" },
    });

    const data: GradeHorariaFindByCampusQueryResult["data"] = [];
    for (const config of configs) {
      const items = await itemRepo.find({
        where: { gradeHoraria: { id: config.id } },
        order: { inicio: "ASC" },
      });

      data.push({
        identificadorExterno: config.identificadorExterno,
        nome: config.nome,
        intervalos: items.map((h) => ({ inicio: h.inicio, fim: h.fim })),
      });
    }

    return { data };
  }

  // ============================================================================
  // Mappers privados
  // ============================================================================

  private async toDomainData(entity: GradeHorariaEntity): Promise<IGradeHorariaDomain> {
    const itemRepo = this.appTypeormConnection.getRepository(GradeHorariaIntervaloEntity);
    const items = await itemRepo.find({
      where: { gradeHoraria: { id: entity.id } },
      order: { inicio: "ASC" },
    });

    const toISO = (v: string | Date): string => (v instanceof Date ? v.toISOString() : v);
    const toISONullable = (v: string | Date | null): string | null =>
      v instanceof Date ? v.toISOString() : v;

    return {
      id: entity.id,
      identificadorExterno: entity.identificadorExterno,
      nome: entity.nome,
      dataInicio: entity.dataInicio,
      dataFim: entity.dataFim,
      ativo: entity.ativo,
      campus: { id: entity.campus?.id },
      intervalos: items.map((h) => ({ inicio: h.inicio, fim: h.fim })),
      version: entity.version,
      previousVersionId: entity.previousVersionId,
      validFrom: toISO(entity.validFrom),
      validTo: toISONullable(entity.validTo),
      dateCreated: toISO(entity.dateCreated),
      dateUpdated: toISO(entity.dateUpdated),
      dateDeleted: toISONullable(entity.dateDeleted),
    };
  }

  // ============================================================================
  // Intervalos (value objects — append-only)
  // ============================================================================

  private async createIntervalos(
    gradeHorariaId: string,
    intervalos: Array<{ inicio: string; fim: string }>,
  ): Promise<void> {
    const itemRepo = this.appTypeormConnection.getRepository(GradeHorariaIntervaloEntity);

    for (const intervalo of intervalos) {
      const entity = new GradeHorariaIntervaloEntity();
      entity.id = generateUuidV7();
      entity.inicio = intervalo.inicio;
      entity.fim = intervalo.fim;
      Object.assign(entity, { gradeHoraria: { id: gradeHorariaId } });
      await itemRepo.save(entity);
    }
  }
}
