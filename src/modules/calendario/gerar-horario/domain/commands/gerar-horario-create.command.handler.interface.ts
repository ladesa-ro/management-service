import type { IAccessContext } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { GerarHorario } from "../gerar-horario";

export interface IGerarHorarioCreateCommand {
  dataInicio: string;
  dataTermino?: string;
  ofertaFormacaoIds?: string[];
  calendarioLetivoIds?: string[];

  boostSameDayOfWeekAndTimeSlot?: number;
  boostSameDayOfWeekOnly?: number;
  boostSameTimeSlotOnly?: number;
  boostLesserDistanceFromDayOfWeek?: number;
  boostLesserDistanceFromTimeSlot?: number;

  enabledConstraints?: string[] | null;

  /** Header `Idempotency-Key`, opcional — sem ele o comando roda sem proteção contra reenvio. */
  idempotencyKey?: string;
}

export const GerarHorarioCreateCommandMetadata = createOperationMetadata({
  operationId: "gerarHorarioCreate",
  summary: "Solicita geracao de horario (assincrono)",
});

export const IGerarHorarioCreateCommandHandler = Symbol("IGerarHorarioCreateCommandHandler");

export interface IGerarHorarioCreateCommandHandler {
  execute(
    accessContext: IAccessContext | null,
    command: IGerarHorarioCreateCommand,
  ): Promise<GerarHorario>;
}
