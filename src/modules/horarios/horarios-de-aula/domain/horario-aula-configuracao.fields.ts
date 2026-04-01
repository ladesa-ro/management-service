/**
 * HorarioAulaConfiguracao — definicao dos campos (FieldMetadata).
 */
import { z } from "zod";
import { createFieldMetadata, SharedFields } from "@/domain/abstractions";

export const HorarioAulaItemConfigFields = {
  inicio: createFieldMetadata({
    description: "Horario inicio (HH:MM:SS)",
    schema: z.string(),
  }),
  fim: createFieldMetadata({
    description: "Horario fim (HH:MM:SS)",
    schema: z.string(),
  }),
};

export const HorarioDeAulaCampusParamsFields = {
  campusId: createFieldMetadata({
    description: "ID do campus",
    schema: z.string().uuid(),
  }),
};

export const HorarioDeAulaReplaceFields = {
  horarios: createFieldMetadata({
    description: "Horarios de aula (substituicao completa)",
  }),
};

export const HorarioDeAulaListOutputFields = {
  data: SharedFields.data,
};
