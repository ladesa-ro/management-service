import type { FindOptionsWhere } from "typeorm";
import { Dep, Impl } from "@/domain/dependency-injection";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import { GerarHorario, type IGerarHorarioDomain } from "../domain/gerar-horario";
import type { GerarHorarioDuracao, GerarHorarioStatus } from "../domain/gerar-horario.types";
import type { IGerarHorarioRepository } from "../domain/repositories/gerar-horario.repository.interface";
import { GerarHorarioEntity } from "./typeorm/gerar-horario.typeorm.entity";
import { GerarHorarioCalendarioLetivoEntity } from "./typeorm/gerar-horario-calendario-letivo.typeorm.entity";
import { GerarHorarioOfertaFormacaoEntity } from "./typeorm/gerar-horario-oferta-formacao.typeorm.entity";

@Impl()
export class GerarHorarioTypeOrmRepositoryAdapter implements IGerarHorarioRepository {
  constructor(
    @Dep(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
  ) {}

  async loadById(id: string): Promise<GerarHorario | null> {
    const repo = this.appTypeormConnection.getRepository(GerarHorarioEntity);
    const entity = await repo.findOneBy({ id });
    if (!entity) return null;

    const junctions = await this.findJunctions(entity.id);

    return GerarHorario.load(this.toDomainData(entity, junctions));
  }

  async save(aggregate: GerarHorario): Promise<void> {
    const repo = this.appTypeormConnection.getRepository(GerarHorarioEntity);

    const entity = repo.create({
      id: aggregate.id,
      status: aggregate.status as GerarHorarioStatus,
      duracao: aggregate.duracao as GerarHorarioDuracao,
      dataInicio: aggregate.dataInicio,
      dataTermino: aggregate.dataTermino,
      requisicaoGerador: aggregate.requisicaoGerador,
      respostaGerador: aggregate.respostaGerador,
      dateCreated: aggregate.dateCreated,
    });
    await repo.save(entity);

    await this.replaceJunctionSet(
      GerarHorarioCalendarioLetivoEntity,
      aggregate.id,
      aggregate.calendarioLetivoIds,
      "calendarioLetivo",
    );
    await this.replaceJunctionSet(
      GerarHorarioOfertaFormacaoEntity,
      aggregate.id,
      aggregate.ofertaFormacaoIds,
      "ofertaFormacao",
    );
  }

  // ============================================================================
  // Mappers privados
  // ============================================================================

  private toDomainData(
    entity: GerarHorarioEntity,
    junctions: { calendarioLetivoIds: string[]; ofertaFormacaoIds: string[] },
  ): IGerarHorarioDomain {
    return {
      id: entity.id,
      status: entity.status,
      duracao: entity.duracao,
      dataInicio: String(entity.dataInicio),
      dataTermino: entity.dataTermino ? String(entity.dataTermino) : null,
      requisicaoGerador: entity.requisicaoGerador,
      respostaGerador: entity.respostaGerador,
      dateCreated: String(entity.dateCreated),
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
