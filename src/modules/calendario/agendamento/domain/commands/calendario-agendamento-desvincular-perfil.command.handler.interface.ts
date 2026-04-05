import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { CalendarioAgendamentoDesvincularPerfilCommand } from "./calendario-agendamento-desvincular-perfil.command";

export const CalendarioAgendamentoDesvincularPerfilCommandMetadata = createOperationMetadata({
  operationId: "calendarioAgendamentoDesvincularPerfil",
  summary: "Desvincula perfil do agendamento",
});

export const ICalendarioAgendamentoDesvincularPerfilCommandHandler = Symbol(
  "ICalendarioAgendamentoDesvincularPerfilCommandHandler",
);

export type ICalendarioAgendamentoDesvincularPerfilCommandHandler = ICommandHandler<
  CalendarioAgendamentoDesvincularPerfilCommand,
  boolean
>;
