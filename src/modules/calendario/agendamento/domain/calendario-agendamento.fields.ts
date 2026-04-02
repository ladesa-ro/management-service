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
