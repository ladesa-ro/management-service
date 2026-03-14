import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";

export type IGerarHorarioPublishTimetableRequestCommand<TRequest = unknown> = {
  request: TRequest;
  timeoutMs?: number;
};

export type IGerarHorarioPublishTimetableRequestCommandHandler = ICommandHandler<
  IGerarHorarioPublishTimetableRequestCommand,
  unknown
>;
export const IGerarHorarioPublishTimetableRequestCommandHandler = Symbol(
  "IGerarHorarioPublishTimetableRequestCommandHandler",
);
