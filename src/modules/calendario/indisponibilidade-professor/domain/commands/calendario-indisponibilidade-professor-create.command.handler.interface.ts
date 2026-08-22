import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { CalendarioIndisponibilidadeProfessorFindOneQueryResult } from "../queries/calendario-indisponibilidade-professor-find-one.query.result";
import type { CalendarioIndisponibilidadeProfessorCreateCommand } from "./calendario-indisponibilidade-professor-create.command";

export const CalendarioIndisponibilidadeProfessorCreateCommandMetadata = createOperationMetadata({
  operationId: "calendarioIndisponibilidadeProfessorCreate",
  summary: "Cria uma indisponibilidade de professor",
});

export const ICalendarioIndisponibilidadeProfessorCreateCommandHandler = Symbol(
  "ICalendarioIndisponibilidadeProfessorCreateCommandHandler",
);

export type ICalendarioIndisponibilidadeProfessorCreateCommandHandler = ICommandHandler<
  CalendarioIndisponibilidadeProfessorCreateCommand,
  CalendarioIndisponibilidadeProfessorFindOneQueryResult
>;
