import type { FindOptionsWhere } from "typeorm";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import type { IGerarHorario } from "../domain/gerar-horario.types";
import type { IGerarHorarioRepository } from "../domain/repositories/gerar-horario.repository.interface";
import { GerarHorarioEntity } from "./typeorm/gerar-horario.typeorm.entity";
import { GerarHorarioCalendarioLetivoEntity } from "./typeorm/gerar-horario-calendario-letivo.typeorm.entity";
import { GerarHorarioOfertaFormacaoEntity } from "./typeorm/gerar-horario-oferta-formacao.typeorm.entity";

@DeclareImplementation()
export class GerarHorarioTypeOrmRepositoryAdapter implements IGerarHorarioRepository {
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
  ) {}

  async findOneBy(where: FindOptionsWhere<GerarHorarioEntity>): Promise<IGerarHorario | null> {
    const repo = this.appTypeormConnection.getRepository(GerarHorarioEntity);
    const entity = await repo.findOneBy(where);
    if (!entity) return null;

    const junctions = await this.findJunctions(entity.id);

    return {
      ...entity,
      calendarioLetivoIds: junctions.calendarioLetivoIds,
      ofertaFormacaoIds: junctions.ofertaFormacaoIds,
    };
  }

  async save(data: Partial<IGerarHorario>): Promise<IGerarHorario> {
    const repo = this.appTypeormConnection.getRepository(GerarHorarioEntity);

    const { calendarioLetivoIds, ofertaFormacaoIds, ...entityData } = data;

    const entity = await repo.save(entityData as GerarHorarioEntity);

    if (calendarioLetivoIds !== undefined) {
      await this.replaceJunctionSet(
        GerarHorarioCalendarioLetivoEntity,
        entity.id,
        calendarioLetivoIds,
        "calendarioLetivo",
      );
    }

    if (ofertaFormacaoIds !== undefined) {
      await this.replaceJunctionSet(
        GerarHorarioOfertaFormacaoEntity,
        entity.id,
        ofertaFormacaoIds,
        "ofertaFormacao",
      );
    }

    const junctions = await this.findJunctions(entity.id);

    return {
      ...entity,
      calendarioLetivoIds: junctions.calendarioLetivoIds,
      ofertaFormacaoIds: junctions.ofertaFormacaoIds,
    };
  }

  // ============================================================================
  // Junções privadas
  // ============================================================================

  private async findJunctions(
    gerarHorarioId: string,
  ): Promise<{ calendarioLetivoIds: string[]; ofertaFormacaoIds: string[] }> {
    const [clJunctions, ofJunctions] = await Promise.all([
      this.appTypeormConnection
        .getRepository(GerarHorarioCalendarioLetivoEntity)
        .find({ where: { gerarHorario: { id: gerarHorarioId } } }),
      this.appTypeormConnection
        .getRepository(GerarHorarioOfertaFormacaoEntity)
        .find({ where: { gerarHorario: { id: gerarHorarioId } } }),
    ]);

    return {
      calendarioLetivoIds: clJunctions.map((j) => j.calendarioLetivo?.id).filter(Boolean),
      ofertaFormacaoIds: ofJunctions.map((j) => j.ofertaFormacao?.id).filter(Boolean),
    };
  }

  private async replaceJunctionSet<T extends { id: string }>(
    entityClass: new () => T,
    gerarHorarioId: string,
    ids: string[],
    relationKey: string,
  ): Promise<void> {
    const repo = this.appTypeormConnection.getRepository(entityClass);

    await repo.delete({
      gerarHorario: { id: gerarHorarioId },
    } as unknown as FindOptionsWhere<T>);

    for (const refId of ids) {
      const entity = new entityClass();
      entity.id = generateUuidV7();
      Object.assign(entity, {
        [relationKey]: { id: refId },
        gerarHorario: { id: gerarHorarioId },
      });
      await repo.save(entity);
    }
  }
}
