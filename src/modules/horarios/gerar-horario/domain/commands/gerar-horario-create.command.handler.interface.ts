import type { IAccessContext } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { IGerarHorario } from "../gerar-horario.types";

export interface IGerarHorarioCreateCommand {
  dataInicio: string;
  dataTermino?: string;
  ofertaFormacaoIds?: string[];
  calendarioLetivoIds?: string[];
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
  ): Promise<IGerarHorario>;
}
