/**
 * Disciplina — schemas zod para a entidade e suas operacoes.
 *
 * Contem os schemas de referencia, composicao (create/update)
 * e validacao da entidade. Fonte unica de verdade (SSOT) para
 * os contratos de dados da entidade.
 */
import { z } from "zod";
import { createSchema, ObjectIdUuidFactory } from "@/domain/abstractions";
import { datedSchema, uuidSchema } from "@/shared/validation/schemas";
import { DisciplinaFields } from "./disciplina.fields";

// ============================================================================
// Fragments de referência
// ============================================================================

export const DisciplinaImagemCapaRefSchema = createSchema((standard) =>
  ObjectIdUuidFactory.create(standard).nullable().optional(),
);

// ============================================================================
// Schemas compostos
// ============================================================================

export const DisciplinaSchema = z
  .object({
    id: uuidSchema,
    nome: DisciplinaFields.nome.domainSchema,
    nomeAbreviado: DisciplinaFields.nomeAbreviado.domainSchema,
    cargaHoraria: DisciplinaFields.cargaHoraria.domainSchema,
    imagemCapa: ObjectIdUuidFactory.domain.nullable(),
  })
  .extend(datedSchema.shape);

export const DisciplinaCreateSchema = createSchema((standard) =>
  z.object({
    nome: DisciplinaFields.nome.create(standard),
    nomeAbreviado: DisciplinaFields.nomeAbreviado.create(standard),
    cargaHoraria: DisciplinaFields.cargaHoraria.create(standard),
    imagemCapa: DisciplinaImagemCapaRefSchema.create(standard),
  }),
);

export const DisciplinaUpdateSchema = createSchema((standard) =>
  z.object({
    nome: DisciplinaFields.nome.create(standard).optional(),
    nomeAbreviado: DisciplinaFields.nomeAbreviado.create(standard).optional(),
    cargaHoraria: DisciplinaFields.cargaHoraria.create(standard).optional(),
    imagemCapa: DisciplinaImagemCapaRefSchema.create(standard),
  }),
);
