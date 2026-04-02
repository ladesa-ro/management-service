/**
 * CalendarioEvento — definicao dos campos (FieldMetadata).
 *
 * Campos de evento identicos a UsuarioEvento/TurmaEvento,
 * com campos adicionais para vinculos (turmaIds, perfilIds, etc.).
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
  turmaIds: createFieldMetadata({
    description: "IDs das turmas participantes",
  }),
  perfilIds: createFieldMetadata({
    description: "IDs dos perfis (professores) participantes",
  }),
  calendarioLetivoIds: createFieldMetadata({
    description: "IDs dos calendarios letivos vinculados",
  }),
  ofertaFormacaoIds: createFieldMetadata({
    description: "IDs das ofertas de formacao vinculadas",
  }),
  modalidadeIds: createFieldMetadata({
    description: "IDs das modalidades vinculadas",
  }),
  ambienteIds: createFieldMetadata({
    description: "IDs dos ambientes vinculados",
  }),
  diarioIds: createFieldMetadata({
    description: "IDs dos diarios vinculados",
  }),
};
