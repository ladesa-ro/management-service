import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";

export type IGerarHorarioPublishTimetableRequestCommand<TRequest = unknown> = {
  request: TRequest;
  timeoutMs?: number;
};

export const GerarHorarioPublishTimetableRequestCommandMetadata = createOperationMetadata({
  operationId: "gerarHorarioPublishTimetableRequest",
  summary: "Publica requisicao de geracao de horario",
});

export const IGerarHorarioPublishTimetableRequestCommandHandler = Symbol(
  "IGerarHorarioPublishTimetableRequestCommandHandler",
);

export type IGerarHorarioPublishTimetableRequestCommandHandler = ICommandHandler<
  IGerarHorarioPublishTimetableRequestCommand,
  unknown
>;
