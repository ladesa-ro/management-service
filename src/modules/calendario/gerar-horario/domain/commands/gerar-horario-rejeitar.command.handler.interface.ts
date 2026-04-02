import type { IAccessContext } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { GerarHorario } from "../gerar-horario";

export interface IGerarHorarioRejeitarCommand {
  id: string;
}

export const GerarHorarioRejeitarCommandMetadata = createOperationMetadata({
  operationId: "gerarHorarioRejeitar",
  summary: "Rejeita o horario gerado",
});

export const IGerarHorarioRejeitarCommandHandler = Symbol("IGerarHorarioRejeitarCommandHandler");

export interface IGerarHorarioRejeitarCommandHandler {
  execute(
    accessContext: IAccessContext | null,
    command: IGerarHorarioRejeitarCommand,
  ): Promise<GerarHorario>;
}
