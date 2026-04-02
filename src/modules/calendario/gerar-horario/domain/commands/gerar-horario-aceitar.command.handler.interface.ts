import type { IAccessContext } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { GerarHorario } from "../gerar-horario";

export interface IGerarHorarioAceitarCommand {
  id: string;
}

export const GerarHorarioAceitarCommandMetadata = createOperationMetadata({
  operationId: "gerarHorarioAceitar",
  summary: "Aceita o horario gerado e aplica ao calendario",
});

export const IGerarHorarioAceitarCommandHandler = Symbol("IGerarHorarioAceitarCommandHandler");

export interface IGerarHorarioAceitarCommandHandler {
  execute(
    accessContext: IAccessContext | null,
    command: IGerarHorarioAceitarCommand,
  ): Promise<GerarHorario>;
}
