import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { CalendarioIndisponibilidadeProfessorFindOneQuery } from "../queries/calendario-indisponibilidade-professor-find-one.query";

export const CalendarioIndisponibilidadeProfessorDeleteCommandMetadata = createOperationMetadata({
  operationId: "calendarioIndisponibilidadeProfessorDeleteOneById",
  summary: "Remove uma indisponibilidade de professor",
});

export const ICalendarioIndisponibilidadeProfessorDeleteCommandHandler = Symbol(
  "ICalendarioIndisponibilidadeProfessorDeleteCommandHandler",
);

export type ICalendarioIndisponibilidadeProfessorDeleteCommandHandler = ICommandHandler<
  CalendarioIndisponibilidadeProfessorFindOneQuery,
  boolean
>;
