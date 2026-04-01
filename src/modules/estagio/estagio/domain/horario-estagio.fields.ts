/**
 * HorarioEstagio — definicao dos campos (FieldMetadata).
 */
import { z } from "zod";
import { createFieldMetadata, SharedFields } from "@/domain/abstractions";

export const HorarioEstagioFields = {
  id: SharedFields.idUuid,
  diaSemana: createFieldMetadata({
    description: "Dia da semana (0=dom..6=sab)",
    schema: z.number().int().min(0).max(6),
  }),
  horaInicio: createFieldMetadata({
    description: "Hora de inicio",
    schema: z.string(),
  }),
  horaFim: createFieldMetadata({
    description: "Hora de fim",
    schema: z.string(),
  }),
};
