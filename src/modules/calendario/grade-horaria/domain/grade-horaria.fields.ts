import { z } from "zod";
import { createFieldMetadata, SharedFields } from "@/domain/abstractions";

export const GradeHorariaIntervaloFields = {
  inicio: createFieldMetadata({
    description: "Horario inicio (HH:MM:SS)",
    schema: z.string(),
  }),
  fim: createFieldMetadata({
    description: "Horario fim (HH:MM:SS)",
    schema: z.string(),
  }),
};

export const GradeHorariaFields = {
  identificadorExterno: createFieldMetadata({
    description: "Identificador externo estavel da grade horaria",
    schema: z.string().uuid(),
  }),
  nome: createFieldMetadata({
    description: "Nome da grade horaria",
    schema: z.string(),
  }),
  intervalos: createFieldMetadata({
    description: "Intervalos de tempo da grade horaria",
  }),
  gradesHorarias: createFieldMetadata({
    description: "Lista de grades horarias (substituicao completa)",
  }),
};

export const GradeHorariaCampusParamsFields = {
  campusId: createFieldMetadata({
    description: "ID do campus",
    schema: z.string().uuid(),
  }),
};

export const GradeHorariaListOutputFields = {
  data: SharedFields.data,
};
