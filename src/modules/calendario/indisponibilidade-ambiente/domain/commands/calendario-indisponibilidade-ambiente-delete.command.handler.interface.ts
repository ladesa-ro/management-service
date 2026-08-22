import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { CalendarioIndisponibilidadeAmbienteFindOneQuery } from "../queries/calendario-indisponibilidade-ambiente-find-one.query";

export const CalendarioIndisponibilidadeAmbienteDeleteCommandMetadata = createOperationMetadata({
  operationId: "calendarioIndisponibilidadeAmbienteDeleteOneById",
  summary: "Remove uma indisponibilidade de ambiente",
});

export const ICalendarioIndisponibilidadeAmbienteDeleteCommandHandler = Symbol(
  "ICalendarioIndisponibilidadeAmbienteDeleteCommandHandler",
);

export type ICalendarioIndisponibilidadeAmbienteDeleteCommandHandler = ICommandHandler<
  CalendarioIndisponibilidadeAmbienteFindOneQuery,
  boolean
>;
