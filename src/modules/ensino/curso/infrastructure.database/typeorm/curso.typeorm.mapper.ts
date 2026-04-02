import type { DeepPartial } from "typeorm";
import type { ICurso } from "@/modules/ensino/curso/domain/curso";
import type { CursoFindOneQueryResult } from "@/modules/ensino/curso/domain/queries/curso-find-one.query.result";
import { OfertaFormacaoTypeormMapper } from "@/modules/ensino/oferta-formacao/infrastructure.database/typeorm";
import { createMapper } from "@/shared/mapping";
import { pickId } from "@/shared/mapping/transforms";
import type { CursoEntity } from "./curso.typeorm.entity";

// ============================================================================
// Persistência → Domínio (TypeORM Entity → Domain / Query Result)
// ============================================================================

export const entityToDomain = createMapper<CursoEntity, ICurso>((e) => ({
  id: e.id,
  nome: e.nome,
  nomeAbreviado: e.nomeAbreviado,
  campus: pickId(e.campus),
  ofertaFormacao: pickId(e.ofertaFormacao),
  imagemCapa: pickId(e.imagemCapa),
  dateCreated: e.dateCreated,
  dateUpdated: e.dateUpdated,
  dateDeleted: e.dateDeleted,
}));

export const entityToFindOneQueryResult = createMapper<CursoEntity, CursoFindOneQueryResult>(
  (e) => ({
    id: e.id,
    nome: e.nome,
    nomeAbreviado: e.nomeAbreviado,
    campus: e.campus,
    ofertaFormacao: OfertaFormacaoTypeormMapper.entityToFindOneQueryResult.map(e.ofertaFormacao),
    imagemCapa: e.imagemCapa,
    dateCreated: e.dateCreated,
    dateUpdated: e.dateUpdated,
    dateDeleted: e.dateDeleted,
  }),
);

// ============================================================================
// Domínio → Persistência (Domain → TypeORM Entity)
// ============================================================================

export const domainToPersistence = createMapper<ICurso, DeepPartial<CursoEntity>>((d) => ({
  id: d.id,
  nome: d.nome,
  nomeAbreviado: d.nomeAbreviado,
  campus: d.campus,
  ofertaFormacao: d.ofertaFormacao,
  imagemCapa: d.imagemCapa,
  dateCreated: d.dateCreated,
  dateUpdated: d.dateUpdated,
  dateDeleted: d.dateDeleted,
}));
