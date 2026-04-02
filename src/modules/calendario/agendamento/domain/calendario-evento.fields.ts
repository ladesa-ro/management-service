/**
 * CalendarioEvento — definicao dos campos (FieldMetadata).
 *
 * Campos de evento identicos a UsuarioEvento/TurmaEvento,
 * com campos adicionais para vinculos (turmas, perfis, etc.).
 */
import { z } from "zod";
import { createFieldMetadata, SharedFields } from "@/domain/abstractions";

export const CalendarioEventoFields = {
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
  turmas: createFieldMetadata({
    description: "Turmas participantes",
  }),
  perfis: createFieldMetadata({
    description: "Perfis (professores) participantes",
  }),
  calendariosLetivos: createFieldMetadata({
    description: "Calendarios letivos vinculados",
  }),
  ofertasFormacao: createFieldMetadata({
    description: "Ofertas de formacao vinculadas",
  }),
  modalidades: createFieldMetadata({
    description: "Modalidades vinculadas",
  }),
  ambientes: createFieldMetadata({
    description: "Ambientes vinculados",
  }),
  diarios: createFieldMetadata({
    description: "Diarios vinculados",
  }),
};
