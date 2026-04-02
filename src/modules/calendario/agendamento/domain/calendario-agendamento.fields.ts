/**
 * Calendario Agendamento — definicao dos campos (FieldMetadata) da entidade.
 */
import { z } from "zod";
import { createFieldMetadata, createSchema } from "@/domain/abstractions";

export const CalendarioAgendamentoFields = {
  nome: createFieldMetadata({
    description: "Nome do agendamento",
    schema: createSchema(() => z.string().min(1, "nome é obrigatório")),
  }),
  dataInicio: createFieldMetadata({
    description: "Data de inicio do agendamento",
    schema: createSchema(() => z.string().min(1)),
  }),
  dataFim: createFieldMetadata({
    description: "Data de fim do agendamento",
  }),
  diaInteiro: createFieldMetadata({
    description: "Se o agendamento ocupa o dia inteiro",
  }),
  horarioInicio: createFieldMetadata({
    description: "Horario de inicio (HH:MM:SS)",
  }),
  horarioFim: createFieldMetadata({
    description: "Horario de fim (HH:MM:SS)",
  }),
  cor: createFieldMetadata({
    description: "Cor do agendamento para exibicao",
  }),
  repeticao: createFieldMetadata({
    description: "Regra de repeticao (iCalendar RRULE)",
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
