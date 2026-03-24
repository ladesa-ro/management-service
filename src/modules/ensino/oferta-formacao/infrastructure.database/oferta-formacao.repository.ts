import { FilterOperator } from "nestjs-paginate";
import { IsNull } from "typeorm";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import { NestJsPaginateAdapter } from "@/infrastructure.database/pagination/adapters/nestjs-paginate.adapter";
import { paginateConfig } from "@/infrastructure.database/pagination/config/paginate-config";
import type { ITypeOrmPaginationConfig } from "@/infrastructure.database/pagination/interfaces/pagination-config.types";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import {
  typeormFindAll,
  typeormSoftDeleteById,
} from "@/infrastructure.database/typeorm/helpers/typeorm-repository-helpers";
import {
  dateToISO,
  dateToISONullable,
  filterActive,
  toRef,
  toRefRequired,
} from "@/infrastructure.database/typeorm/mapping";
import type {
  OfertaFormacaoFindOneQuery,
  OfertaFormacaoFindOneQueryResult,
  OfertaFormacaoListQuery,
  OfertaFormacaoListQueryResult,
} from "@/modules/ensino/oferta-formacao";
import {
  type IOfertaFormacao,
  OfertaFormacao,
} from "@/modules/ensino/oferta-formacao/domain/oferta-formacao";
import type { IOfertaFormacaoRepository } from "@/modules/ensino/oferta-formacao/domain/repositories";
import { getNow } from "@/utils/date";
import {
  OfertaFormacaoEntity,
  OfertaFormacaoNivelFormacaoEntity,
  OfertaFormacaoPeriodoEntity,
  OfertaFormacaoPeriodoEtapaEntity,
  ofertaFormacaoEntityDomainMapper,
} from "./typeorm";

const config = {
  alias: "oferta_formacao",
  hasSoftDelete: true,
} as const;

const ofertaFormacaoPaginateConfig: ITypeOrmPaginationConfig<OfertaFormacaoEntity> = {
  ...paginateConfig,
  relations: {
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
  },
  sortableColumns: ["nome", "slug", "dateCreated"],
  searchableColumns: ["id", "nome", "slug"],
  defaultSortBy: [
    ["nome", "ASC"],
    ["dateCreated", "ASC"],
  ],
  filterableColumns: {
    "modalidade.id": [FilterOperator.EQ],
    "campus.id": [FilterOperator.EQ],
  },
};

/**
 * Relations para o write side (loadById).
 * Carrega o mínimo necessário para reconstituir o aggregate:
 * - modalidade/campus: join para extrair o ID (TypeORM não expõe FK sem join)
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

    return OfertaFormacao.load(this.toDomainData(entity));
  }

  async save(aggregate: OfertaFormacao): Promise<void> {
    const entityData = ofertaFormacaoEntityDomainMapper.toPersistenceData({ ...aggregate });
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

    return this.toQueryResult(entity);
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
      (entity) => this.toQueryResult(entity),
    );
  }

  // ==========================================
  // Mappers privados — fronteira de tradução do adapter
  // ==========================================

  /**
   * Entity TypeORM → dados para Domain.load() (write side).
   *
   * Projeta relações como { id } — o domínio não carrega dados de outros aggregates.
   * Achata junction tables extraindo apenas os IDs.
   * Value objects (periodos, etapas) são mapeados na forma mínima do domínio.
   * Datas Date → ISO string (o domínio usa ScalarDateTimeString).
   */
  private toDomainData(entity: OfertaFormacaoEntity): IOfertaFormacao {
    return {
      id: entity.id,
      nome: entity.nome,
      slug: entity.slug,
      duracaoPeriodoEmMeses: entity.duracaoPeriodoEmMeses,

      modalidade: toRef(entity.modalidade),
      campus: toRefRequired(entity.campus),

      niveisFormacoes: filterActive(entity.ofertaFormacaoNiveisFormacoes).map((nf) => ({
        id: nf.nivelFormacao.id,
      })),

      periodos: filterActive(entity.periodosEntities)
        .sort((a, b) => a.numeroPeriodo - b.numeroPeriodo)
        .map((p) => ({
          numeroPeriodo: p.numeroPeriodo,
          etapas: filterActive(p.etapas).map((e) => ({
            nome: e.nome,
            cor: e.cor,
          })),
        })),

      dateCreated: dateToISO(entity.dateCreated),
      dateUpdated: dateToISO(entity.dateUpdated),
      dateDeleted: dateToISONullable(entity.dateDeleted),
    };
  }

  /**
   * Entity TypeORM → Query Result (read side).
   *
   * Projeta relações como objetos completos — a UI precisa dos dados para exibição.
   * Achata junction tables mas preserva os objetos internos completos.
   * Value objects incluem IDs de persistência (para links na UI).
   */
  private toQueryResult(entity: OfertaFormacaoEntity): OfertaFormacaoFindOneQueryResult {
    return {
      id: entity.id,
      nome: entity.nome,
      slug: entity.slug,
      duracaoPeriodoEmMeses: entity.duracaoPeriodoEmMeses,
      dateCreated: entity.dateCreated,
      dateUpdated: entity.dateUpdated,
      dateDeleted: entity.dateDeleted,

      modalidade: entity.modalidade ?? null,
      campus: entity.campus,

      niveisFormacoes: filterActive(entity.ofertaFormacaoNiveisFormacoes).map(
        (nf) => nf.nivelFormacao,
      ),

      periodos: filterActive(entity.periodosEntities)
        .sort((a, b) => a.numeroPeriodo - b.numeroPeriodo)
        .map((p) => ({
          id: p.id,
          numeroPeriodo: p.numeroPeriodo,
          etapas: filterActive(p.etapas).map((e) => ({
            id: e.id,
            nome: e.nome,
            cor: e.cor,
          })),
        })),
    } as unknown as OfertaFormacaoFindOneQueryResult;
  }

  // ==========================================
  // Métodos privados de persistência
  // ==========================================

  private async replaceNiveisFormacoes(
    ofertaFormacaoId: string,
    niveisFormacoes: Array<{ id: string }>,
  ): Promise<void> {
    const repo = this.appTypeormConnection.getRepository(OfertaFormacaoNivelFormacaoEntity);
    const now = getNow();

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
    const now = getNow();

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
