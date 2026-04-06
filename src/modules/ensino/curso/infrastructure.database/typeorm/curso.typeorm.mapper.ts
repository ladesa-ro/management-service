import type { DeepPartial } from "typeorm";
import { CampusTypeormMapper } from "@/modules/ambientes/campus/infrastructure.database/typeorm";
import type { ICurso } from "@/modules/ensino/curso/domain/curso";
import type {
  CursoFindOneQueryResult,
  CursoPeriodoQueryResult,
} from "@/modules/ensino/curso/domain/queries/curso-find-one.query.result";
import { OfertaFormacaoTypeormMapper } from "@/modules/ensino/oferta-formacao/infrastructure.database/typeorm";
import { createMapper } from "@/shared/mapping";
import { pickId } from "@/shared/mapping/transforms";
import type { CursoEntity } from "./curso.typeorm.entity";
import type { CursoPeriodoDisciplinaEntity } from "./curso-periodo-disciplina.typeorm.entity";

// ============================================================================
// Helpers
// ============================================================================

function groupPeriodoDisciplinas(
  entries: CursoPeriodoDisciplinaEntity[] | undefined,
): CursoPeriodoQueryResult[] {
  if (!entries || entries.length === 0) return [];

  const periodoMap = new Map<number, CursoPeriodoQueryResult>();

  for (const entry of entries) {
    let periodo = periodoMap.get(entry.numeroPeriodo);
    if (!periodo) {
      periodo = { numeroPeriodo: entry.numeroPeriodo, disciplinas: [] };
      periodoMap.set(entry.numeroPeriodo, periodo);
    }
    periodo.disciplinas.push({
      id: entry.id,
      disciplinaId: entry.disciplina?.id,
      disciplinaNome: entry.disciplina?.nome ?? null,
      cargaHoraria: entry.cargaHoraria,
    });
  }

  return Array.from(periodoMap.values()).sort((a, b) => a.numeroPeriodo - b.numeroPeriodo);
}

// ============================================================================
// Persistência → Domínio (TypeORM Entity → Domain / Query Result)
// ============================================================================

export const entityToDomain = createMapper<CursoEntity, ICurso>((e) => ({
  id: e.id,
  nome: e.nome,
  nomeAbreviado: e.nomeAbreviado,
  quantidadePeriodos: e.quantidadePeriodos,
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
    quantidadePeriodos: e.quantidadePeriodos,
    campus: CampusTypeormMapper.entityToFindOneQueryResult.map(e.campus),
    ofertaFormacao: OfertaFormacaoTypeormMapper.entityToFindOneQueryResult.map(e.ofertaFormacao),
    imagemCapa: e.imagemCapa,
    periodos: groupPeriodoDisciplinas(e.periodoDisciplinas),
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
  quantidadePeriodos: d.quantidadePeriodos,
  campus: d.campus,
  ofertaFormacao: d.ofertaFormacao,
  imagemCapa: d.imagemCapa ? pickId(d.imagemCapa) : null,
  dateCreated: d.dateCreated,
  dateUpdated: d.dateUpdated,
  dateDeleted: d.dateDeleted,
}));
