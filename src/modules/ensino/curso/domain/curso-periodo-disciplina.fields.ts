/**
 * CursoPeriodoDisciplina — definicao dos campos (FieldMetadata).
 */
import { z } from "zod";
import { createFieldMetadata, SharedFields } from "@/domain/abstractions";

export const CursoPeriodoDisciplinaParamsFields = {
  cursoId: createFieldMetadata({
    description: "ID do curso",
    schema: z.string().uuid(),
  }),
};

export const CursoPeriodoDisciplinaItemFields = {
  id: SharedFields.idUuid,
  disciplinaId: createFieldMetadata({
    description: "ID da disciplina",
    schema: z.string().uuid(),
  }),
  disciplinaNome: createFieldMetadata({
    description: "Nome da disciplina",
    schema: z.string(),
    nullable: true,
  }),
  cargaHoraria: createFieldMetadata({
    description: "Carga horaria",
    schema: z.number().int().min(0),
  }),
};

export const CursoPeriodoDisciplinaPeriodoFields = {
  numeroPeriodo: createFieldMetadata({
    description: "Numero do periodo",
    schema: z.number().int().min(1),
  }),
  disciplinas: createFieldMetadata({
    description: "Disciplinas do periodo",
  }),
};
