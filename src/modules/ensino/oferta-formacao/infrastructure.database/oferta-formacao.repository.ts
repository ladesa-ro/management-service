import { IsNull } from "typeorm";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import { NestJsPaginateAdapter } from "@/infrastructure.database/pagination/adapters/nestjs-paginate.adapter";
import { buildTypeOrmPaginateConfig } from "@/infrastructure.database/pagination/adapters/pagination-spec.adapter";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import {
  typeormFindAll,
  typeormSoftDeleteById,
} from "@/infrastructure.database/typeorm/helpers/typeorm-repository-helpers";
import type {
  OfertaFormacaoFindOneQuery,
  OfertaFormacaoFindOneQueryResult,
  OfertaFormacaoListQuery,
  OfertaFormacaoListQueryResult,
} from "@/modules/ensino/oferta-formacao";
import { OfertaFormacao } from "@/modules/ensino/oferta-formacao/domain/oferta-formacao";
import { ofertaFormacaoPaginationSpec } from "@/modules/ensino/oferta-formacao/domain/queries";
import type { IOfertaFormacaoRepository } from "@/modules/ensino/oferta-formacao/domain/repositories";
import { getNowISO } from "@/utils/date";
import {
  OfertaFormacaoEntity,
  OfertaFormacaoNivelFormacaoEntity,
  OfertaFormacaoPeriodoEntity,
  OfertaFormacaoPeriodoEtapaEntity,
  OfertaFormacaoTypeormMapper,
} from "./typeorm";

const config = {
  alias: "oferta_formacao",
  hasSoftDelete: true,
} as const;

const ofertaFormacaoRelations = {
  modalidade: true,
  campus: {
    endereco: {
      cidade: {
        estado: true,
      },
    },
  },
  ofertaFormacaoNiveisFormacoes: {
    nivelFormacao: true,
  },
  periodosEntities: {
    etapas: true,
  },
};

const ofertaFormacaoPaginateConfig = buildTypeOrmPaginateConfig<OfertaFormacaoEntity>(
  ofertaFormacaoPaginationSpec,
  ofertaFormacaoRelations,
);

/**
 * Relations para o write side (loadById).
 * Carrega o minimo necessario para reconstituir o aggregate:
 * - modalidade/campus: join para extrair o ID (TypeORM nao expoe FK sem join)
 * - ofertaFormacaoNiveisFormacoes + nivelFormacao: junction table para extrair IDs
 * - periodosEntities + etapas: value objects do aggregate
 */
const writeRelations = {
  modalidade: true,
  campus: true,
  ofertaFormacaoNiveisFormacoes: {
    nivelFormacao: true,
  },
  periodosEntities: {
    etapas: true,
  },
} as const;

@DeclareImplementation()
export class OfertaFormacaoTypeOrmRepositoryAdapter implements IOfertaFormacaoRepository {
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
    private readonly paginationAdapter: NestJsPaginateAdapter,
  ) {}

  // ==========================================
  // Write side
  // ==========================================

  async loadById(
    _accessContext: IAccessContext | null,
    id: string,
  ): Promise<OfertaFormacao | null> {
    const repo = this.appTypeormConnection.getRepository(OfertaFormacaoEntity);

    const entity = await repo.findOne({
      where: { id, dateDeleted: IsNull() },
      relations: writeRelations,
    });

    if (!entity) return null;

    return OfertaFormacao.load(OfertaFormacaoTypeormMapper.entityToDomain.map(entity));
  }

  async save(aggregate: OfertaFormacao): Promise<void> {
    const entityData = OfertaFormacaoTypeormMapper.domainToPersistence.map({ ...aggregate });
    const repo = this.appTypeormConnection.getRepository(OfertaFormacaoEntity);
    await repo.save(repo.create({ id: aggregate.id, ...entityData } as OfertaFormacaoEntity));

    await this.replaceNiveisFormacoes(aggregate.id, aggregate.niveisFormacoes);
    await this.replacePeriodos(aggregate.id, aggregate.periodos);
  }

  softDeleteById(id: string) {
    return typeormSoftDeleteById(this.appTypeormConnection, OfertaFormacaoEntity, config.alias, id);
  }

  // ==========================================
  // Read side
  // ==========================================

  async getFindOneQueryResult(
    _accessContext: IAccessContext | null,
    dto: OfertaFormacaoFindOneQuery,
  ): Promise<OfertaFormacaoFindOneQueryResult | null> {
    const repo = this.appTypeormConnection.getRepository(OfertaFormacaoEntity);

    const entity = await repo.findOne({
      where: { id: dto.id, dateDeleted: IsNull() },
      relations: ofertaFormacaoPaginateConfig.relations,
    });

    if (!entity) return null;

    return OfertaFormacaoTypeormMapper.entityToOutput.map(entity);
  }

  getFindAllQueryResult(
    _accessContext: IAccessContext | null,
    dto: OfertaFormacaoListQuery | null = null,
  ): Promise<OfertaFormacaoListQueryResult> {
    return typeormFindAll<
      OfertaFormacaoEntity,
      OfertaFormacaoListQuery,
      OfertaFormacaoListQueryResult
    >(
      this.appTypeormConnection,
      OfertaFormacaoEntity,
      { ...config, paginateConfig: ofertaFormacaoPaginateConfig },
      this.paginationAdapter,
      dto,
      OfertaFormacaoTypeormMapper.entityToOutput.map,
    );
  }

  // ==========================================
  // Metodos privados de persistencia
  // ==========================================

  private async replaceNiveisFormacoes(
    ofertaFormacaoId: string,
    niveisFormacoes: Array<{ id: string }>,
  ): Promise<void> {
    const repo = this.appTypeormConnection.getRepository(OfertaFormacaoNivelFormacaoEntity);
    const now = getNowISO();

    await repo
      .createQueryBuilder()
      .update(OfertaFormacaoNivelFormacaoEntity)
      .set({ dateDeleted: now })
      .where("id_oferta_formacao_fk = :ofertaFormacaoId AND date_deleted IS NULL", {
        ofertaFormacaoId,
      })
      .execute();

    if (niveisFormacoes.length === 0) return;

    const entities = niveisFormacoes.map((nf) => {
      const entity = new OfertaFormacaoNivelFormacaoEntity();
      entity.id = generateUuidV7();
      Object.assign(entity, { nivelFormacao: { id: nf.id } });
      Object.assign(entity, { ofertaFormacao: { id: ofertaFormacaoId } });
      entity.dateCreated = now;
      entity.dateUpdated = now;
      entity.dateDeleted = null;
      return entity;
    });
    await repo.save(entities);
  }

  private async replacePeriodos(
    ofertaFormacaoId: string,
    periodos: OfertaFormacao["periodos"],
  ): Promise<void> {
    const periodoRepo = this.appTypeormConnection.getRepository(OfertaFormacaoPeriodoEntity);
    const etapaRepo = this.appTypeormConnection.getRepository(OfertaFormacaoPeriodoEtapaEntity);
    const now = getNowISO();

    const existingPeriodos = await periodoRepo.find({
      where: { ofertaFormacao: { id: ofertaFormacaoId }, dateDeleted: IsNull() },
      relations: { etapas: true },
    });

    for (const p of existingPeriodos) {
      for (const e of p.etapas ?? []) {
        if (e.dateDeleted === null) {
          await etapaRepo.update(e.id, { dateDeleted: now });
        }
      }
      await periodoRepo.update(p.id, { dateDeleted: now });
    }

    for (const periodo of periodos) {
      const periodoEntity = new OfertaFormacaoPeriodoEntity();
      periodoEntity.id = generateUuidV7();
      Object.assign(periodoEntity, { ofertaFormacao: { id: ofertaFormacaoId } });
      periodoEntity.numeroPeriodo = periodo.numeroPeriodo;
      periodoEntity.dateCreated = now;
      periodoEntity.dateUpdated = now;
      periodoEntity.dateDeleted = null;
      await periodoRepo.save(periodoEntity);

      for (const etapa of periodo.etapas) {
        const etapaEntity = new OfertaFormacaoPeriodoEtapaEntity();
        etapaEntity.id = generateUuidV7();
        Object.assign(etapaEntity, { ofertaFormacaoPeriodo: { id: periodoEntity.id } });
        etapaEntity.nome = etapa.nome;
        etapaEntity.cor = etapa.cor;
        etapaEntity.dateCreated = now;
        etapaEntity.dateUpdated = now;
        etapaEntity.dateDeleted = null;
        await etapaRepo.save(etapaEntity);
      }
    }
  }
}
