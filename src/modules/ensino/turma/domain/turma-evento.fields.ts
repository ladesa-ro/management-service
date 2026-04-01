/**
 * TurmaEvento — definicao dos campos (FieldMetadata).
 *
 * Estruturalmente identico a UsuarioEvento (mesmos campos de evento).
 */
import { z } from "zod";
import { createFieldMetadata, SharedFields } from "@/domain/abstractions";

export const TurmaEventoFields = {
  id: SharedFields.idUuid,
  nome: createFieldMetadata({
    description: "Nome do evento/atividade",
    schema: z.string(),
    nullable: true,
  }),
  tipo: createFieldMetadata({
    description: "Tipo: EVENTO (atividade) ou INDISPONIBILIDADE",
    schema: z.string(),
  }),
  dataInicio: createFieldMetadata({
    description: "Data de inicio",
    schema: z.string().date(),
  }),
  dataFim: createFieldMetadata({
    description: "Data de fim",
    schema: z.string().date().nullable(),
    nullable: true,
  }),
  diaInteiro: createFieldMetadata({
    description: "Indica se o evento ocupa o dia inteiro",
    schema: z.boolean(),
  }),
  horarioInicio: createFieldMetadata({
    description: "Horário de inicio (HH:MM)",
    schema: z.string(),
  }),
  horarioFim: createFieldMetadata({
    description: "Horário de fim (HH:MM)",
    schema: z.string(),
  }),
  cor: createFieldMetadata({
    description: "Cor do evento (hex)",
    schema: z.string().nullable(),
    nullable: true,
  }),
  repeticao: createFieldMetadata({
    description: "Regra de repetição",
    schema: z.string().nullable(),
    nullable: true,
  }),
  status: createFieldMetadata({
    description: "Status do evento",
    schema: z.string().nullable(),
    nullable: true,
  }),
};
