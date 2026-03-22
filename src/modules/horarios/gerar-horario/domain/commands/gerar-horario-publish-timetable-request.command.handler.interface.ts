import type { ICommandHandler } from "@/domain/abstractions";

export type IGerarHorarioPublishTimetableRequestCommand<TRequest = unknown> = {
  request: TRequest;
  timeoutMs?: number;
};

export const IGerarHorarioPublishTimetableRequestCommandHandler = Symbol(
  "IGerarHorarioPublishTimetableRequestCommandHandler",
);

export type IGerarHorarioPublishTimetableRequestCommandHandler = ICommandHandler<
  IGerarHorarioPublishTimetableRequestCommand,
  unknown
>;
