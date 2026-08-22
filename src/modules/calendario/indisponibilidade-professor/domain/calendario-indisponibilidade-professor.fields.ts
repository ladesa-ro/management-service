/**
 * Calendario Indisponibilidade Professor — definicao dos campos (FieldMetadata) da entidade.
 */
import { z } from "zod";
import { createFieldMetadata, createSchema } from "@/domain/abstractions";

export const CalendarioIndisponibilidadeProfessorTipoValues = ["BLOQUEIO", "PREFERENCIA"] as const;

export const CalendarioIndisponibilidadeProfessorTipoSchema = z.enum(
  CalendarioIndisponibilidadeProfessorTipoValues,
);

export const CalendarioIndisponibilidadeProfessorFields = {
  perfil: createFieldMetadata({
    description: "Professor (perfil) ao qual a indisponibilidade se aplica",
  }),
  tipo: createFieldMetadata({
    description:
      "BLOQUEIO (professor genuinamente não pode ser escalado) ou PREFERENCIA (evitar se possível, mas não proibido)",
    schema: createSchema(() => CalendarioIndisponibilidadeProfessorTipoSchema),
  }),
  diaSemana: createFieldMetadata({
    description:
      "Dia da semana da regra recorrente (0=domingo..6=sábado). Mutuamente exclusivo com data — presente aqui significa regra semanal, aplicada toda semana.",
    nullable: true,
    schema: createSchema(() => z.number().int().min(0).max(6).nullable()),
  }),
  data: createFieldMetadata({
    description:
      "Data (YYYY-MM-DD) da exceção pontual. Mutuamente exclusivo com diaSemana — presente aqui significa que a indisponibilidade vale apenas nesse dia específico.",
    nullable: true,
    schema: createSchema(() => z.string().date().nullable()),
  }),
  inicio: createFieldMetadata({
    description: "Horário de início (HH:MM:SS)",
    schema: createSchema(() => z.string().min(1)),
  }),
  fim: createFieldMetadata({
    description: "Horário de fim (HH:MM:SS)",
    schema: createSchema(() => z.string().min(1)),
  }),
  motivo: createFieldMetadata({
    description: "Motivo da indisponibilidade",
    nullable: true,
    schema: createSchema(() => z.string().nullable()),
  }),
};
