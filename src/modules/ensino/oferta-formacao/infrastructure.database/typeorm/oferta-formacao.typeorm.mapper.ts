import type { DeepPartial } from "typeorm";
import {
  filterActive,
  mapDatedEntity,
  toRefRequired,
} from "@/infrastructure.database/typeorm/mapping";
import { CampusTypeormMapper } from "@/modules/ambientes/campus/infrastructure.database/typeorm";
import type { IOfertaFormacao } from "@/modules/ensino/oferta-formacao/domain/oferta-formacao";
import type { OfertaFormacaoFindOneQueryResult } from "@/modules/ensino/oferta-formacao/domain/queries/oferta-formacao-find-one.query.result";
import { createMapper, pickId } from "@/shared/mapping";
import type { OfertaFormacaoEntity } from "./oferta-formacao.typeorm.entity";

// ============================================================================
// Persistencia -> Dominio (TypeORM Entity -> Domain / Query Result)
// ============================================================================

export const entityToDomain = createMapper<OfertaFormacaoEntity, IOfertaFormacao>((e) => ({
  id: e.id,
  nome: e.nome,
  slug: e.slug,
  duracaoPeriodoEmMeses: e.duracaoPeriodoEmMeses,

  modalidade: toRefRequired(e.modalidade),
  campus: toRefRequired(e.campus),

  niveisFormacoes: filterActive(e.ofertaFormacaoNiveisFormacoes).map((nf) => ({
    id: nf.nivelFormacao.id,
  })),

  periodos: filterActive(e.periodosEntities)
    .sort((a, b) => a.numeroPeriodo - b.numeroPeriodo)
    .map((p) => ({
      numeroPeriodo: p.numeroPeriodo,
      etapas: filterActive(p.etapas)
        .sort((a, b) => a.ordem - b.ordem)
        .map((et) => ({
          nome: et.nome,
          cor: et.cor,
        })),
    })),

  imagemCapa: e.imagemCapa ? pickId(e.imagemCapa) : null,

  dateCreated: e.dateCreated,
  dateUpdated: e.dateUpdated,
  dateDeleted: e.dateDeleted,
}));

export const entityToFindOneQueryResult = createMapper<
  OfertaFormacaoEntity,
  OfertaFormacaoFindOneQueryResult
>((e) => ({
  id: e.id,
  nome: e.nome,
  slug: e.slug,
  duracaoPeriodoEmMeses: e.duracaoPeriodoEmMeses,
  dateCreated: e.dateCreated,
  dateUpdated: e.dateUpdated,
  dateDeleted: e.dateDeleted,

  modalidade: mapDatedEntity(e.modalidade),

  campus: CampusTypeormMapper.entityToFindOneQueryResult.map(e.campus),

  niveisFormacoes: filterActive(e.ofertaFormacaoNiveisFormacoes).map((nf) =>
    mapDatedEntity(nf.nivelFormacao),
  ),

  periodos: filterActive(e.periodosEntities)
    .sort((a, b) => a.numeroPeriodo - b.numeroPeriodo)
    .map((p) => ({
      id: p.id,
      numeroPeriodo: p.numeroPeriodo,
      etapas: filterActive(p.etapas)
        .sort((a, b) => a.ordem - b.ordem)
        .map((et) => ({
          id: et.id,
          nome: et.nome,
          cor: et.cor,
        })),
    })),

  imagemCapa: e.imagemCapa ?? null,
}));

// ============================================================================
// Dominio -> Persistencia (Domain -> TypeORM Entity)
// ============================================================================

export const domainToPersistence = createMapper<IOfertaFormacao, DeepPartial<OfertaFormacaoEntity>>(
  (d) => ({
    id: d.id,
    nome: d.nome,
    slug: d.slug,
    duracaoPeriodoEmMeses: d.duracaoPeriodoEmMeses,
    modalidade: pickId(d.modalidade),
    campus: pickId(d.campus),
    imagemCapa: d.imagemCapa ? pickId(d.imagemCapa) : null,
    dateCreated: d.dateCreated,
    dateUpdated: d.dateUpdated,
    dateDeleted: d.dateDeleted,
  }),
);
