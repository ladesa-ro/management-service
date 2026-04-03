/**
 * Curso — schemas zod para a entidade e suas operacoes.
 *
 * Contem os schemas de referencia, composicao (create/update)
 * e validacao da entidade. Fonte unica de verdade (SSOT) para
 * os contratos de dados da entidade.
 */
import { z } from "zod";
import {
  createSchema,
  ObjectIdUuidFactory,
  ObjectIdUuidFactoryNullable,
} from "@/domain/abstractions";
import { datedSchema, uuidSchema } from "@/shared/validation/schemas";
import { CursoFields } from "./curso.fields";

// ============================================================================
// Fragments de referência
// ============================================================================

export const CursoCampusRefSchema = ObjectIdUuidFactory;

export const CursoOfertaFormacaoRefSchema = ObjectIdUuidFactory;

export const CursoImagemCapaRefSchema = createSchema((standard) =>
  ObjectIdUuidFactoryNullable.create(standard).optional(),
);

// ============================================================================
// Schemas de período-disciplina (para input de create/update)
// ============================================================================

const CursoPeriodoDisciplinaItemSchema = z.object({
  disciplinaId: z.string().uuid(),
  cargaHoraria: z.number().int().min(0).optional(),
});

const CursoPeriodoItemSchema = z.object({
  numeroPeriodo: z.number().int().min(1),
  disciplinas: z.array(CursoPeriodoDisciplinaItemSchema),
});

// ============================================================================
// Schemas compostos
// ============================================================================

export const CursoSchema = z
  .object({
    id: uuidSchema,
    nome: CursoFields.nome.domainSchema,
    nomeAbreviado: CursoFields.nomeAbreviado.domainSchema,
    quantidadePeriodos: CursoFields.quantidadePeriodos.domainSchema,
    campus: ObjectIdUuidFactory.domain,
    ofertaFormacao: ObjectIdUuidFactory.domain,
    imagemCapa: ObjectIdUuidFactoryNullable.domain,
  })
  .extend(datedSchema.shape);

export const CursoCreateSchema = createSchema((standard) =>
  z.object({
    nome: CursoFields.nome.create(standard),
    nomeAbreviado: CursoFields.nomeAbreviado.create(standard),
    quantidadePeriodos: CursoFields.quantidadePeriodos.create(standard),
    campus: CursoCampusRefSchema.create(standard),
    ofertaFormacao: CursoOfertaFormacaoRefSchema.create(standard),
    periodos: z.array(CursoPeriodoItemSchema).optional(),
  }),
);

export const CursoUpdateSchema = createSchema((standard) =>
  z.object({
    nome: CursoFields.nome.create(standard).optional(),
    nomeAbreviado: CursoFields.nomeAbreviado.create(standard).optional(),
    quantidadePeriodos: CursoFields.quantidadePeriodos.create(standard).optional(),
    campus: CursoCampusRefSchema.create(standard).optional(),
    ofertaFormacao: CursoOfertaFormacaoRefSchema.create(standard).optional(),
    periodos: z.array(CursoPeriodoItemSchema).optional(),
  }),
);
