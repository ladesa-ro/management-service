/**
 * TurmaDisponibilidade — definicao dos campos (FieldMetadata).
 */
import { z } from "zod";
import { createFieldMetadata } from "@/domain/abstractions";

export const TurmaDisponibilidadeParamsFields = {
  turmaId: createFieldMetadata({
    description: "ID da turma",
    schema: z.string().uuid(),
  }),
};

export const TurmaDisponibilidadeQueryFields = {
  semana: createFieldMetadata({
    description: "Data da semana (qualquer dia, normalizado para domingo)",
    schema: z.string().date(),
  }),
};

export const TurmaDisponibilidadeIntervaloFields = {
  inicio: createFieldMetadata({
    description: "Horario inicio (HH:MM:SS)",
    schema: z.string(),
  }),
  fim: createFieldMetadata({
    description: "Horario fim (HH:MM:SS)",
    schema: z.string(),
  }),
};

export const TurmaDisponibilidadeDiaFields = {
  dia_semana: createFieldMetadata({
    description: "Dia da semana (1=seg..6=sab)",
    schema: z.number().int().min(1).max(6),
  }),
  intervalos: createFieldMetadata({
    description: "Intervalos de disponibilidade",
  }),
};

export const TurmaDisponibilidadeConfigFields = {
  data_inicio: createFieldMetadata({
    description: "Data inicio da vigencia",
    schema: z.string().date(),
  }),
  data_fim: createFieldMetadata({
    description: "Data fim da vigencia",
    schema: z.string().date().nullable(),
    nullable: true,
  }),
  horarios: createFieldMetadata({
    description: "Horarios de disponibilidade por dia da semana",
  }),
};

export const TurmaDisponibilidadeSaveFields = {
  configs: createFieldMetadata({
    description: "Configuracoes de disponibilidade",
  }),
  aplicar_futuras: createFieldMetadata({
    description: "Aplicar tambem para semanas futuras",
    schema: z.boolean().optional(),
    nullable: true,
  }),
};
