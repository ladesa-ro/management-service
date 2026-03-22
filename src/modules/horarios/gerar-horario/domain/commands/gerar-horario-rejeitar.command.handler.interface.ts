import { createOperationMetadata } from "@/domain/abstractions";
import type { AccessContext } from "@/server/access-context";
import type { GerarHorarioEntity } from "../../infrastructure.database/typeorm/gerar-horario.typeorm.entity";

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
    accessContext: AccessContext | null,
    command: IGerarHorarioRejeitarCommand,
  ): Promise<GerarHorarioEntity>;
}
