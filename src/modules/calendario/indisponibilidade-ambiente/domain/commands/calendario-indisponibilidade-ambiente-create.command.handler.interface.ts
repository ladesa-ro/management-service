import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { CalendarioIndisponibilidadeAmbienteFindOneQueryResult } from "../queries/calendario-indisponibilidade-ambiente-find-one.query.result";
import type { CalendarioIndisponibilidadeAmbienteCreateCommand } from "./calendario-indisponibilidade-ambiente-create.command";

export const CalendarioIndisponibilidadeAmbienteCreateCommandMetadata = createOperationMetadata({
  operationId: "calendarioIndisponibilidadeAmbienteCreate",
  summary: "Cria uma indisponibilidade de ambiente",
});

export const ICalendarioIndisponibilidadeAmbienteCreateCommandHandler = Symbol(
  "ICalendarioIndisponibilidadeAmbienteCreateCommandHandler",
);

export type ICalendarioIndisponibilidadeAmbienteCreateCommandHandler = ICommandHandler<
  CalendarioIndisponibilidadeAmbienteCreateCommand,
  CalendarioIndisponibilidadeAmbienteFindOneQueryResult
>;
