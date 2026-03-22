/**
 * Disciplina — schemas zod para a entidade e suas operacoes.
 *
 * Contem os schemas de referencia, composicao (create/update)
 * e validacao da entidade. Fonte unica de verdade (SSOT) para
 * os contratos de dados da entidade.
 */
import { z } from "zod";
import { datedSchema, uuidSchema } from "@/shared/validation/schemas";
import { DisciplinaFields } from "./disciplina.fields";

// ============================================================================
// Fragments de referência
// ============================================================================

export const DisciplinaImagemCapaRefSchema = z.object({ id: uuidSchema }).nullable().optional();

// ============================================================================
// Schemas compostos
// ============================================================================

export const DisciplinaSchema = z
  .object({
    id: uuidSchema,
    nome: DisciplinaFields.nome.schema,
    nomeAbreviado: DisciplinaFields.nomeAbreviado.schema,
    cargaHoraria: DisciplinaFields.cargaHoraria.schema,
    imagemCapa: z.object({ id: uuidSchema }).nullable(),
  })
  .merge(datedSchema);

export const DisciplinaCreateSchema = z.object({
  nome: DisciplinaFields.nome.schema,
  nomeAbreviado: DisciplinaFields.nomeAbreviado.schema,
  cargaHoraria: DisciplinaFields.cargaHoraria.schema,
  imagemCapa: DisciplinaImagemCapaRefSchema,
});

export const DisciplinaUpdateSchema = z.object({
  nome: DisciplinaFields.nome.schema.optional(),
  nomeAbreviado: DisciplinaFields.nomeAbreviado.schema.optional(),
  cargaHoraria: DisciplinaFields.cargaHoraria.schema.optional(),
  imagemCapa: DisciplinaImagemCapaRefSchema,
});
