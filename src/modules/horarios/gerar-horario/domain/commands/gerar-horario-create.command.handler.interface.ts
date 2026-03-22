import { createOperationMetadata } from "@/domain/abstractions";
import type { AccessContext } from "@/server/access-context";
import type { GerarHorarioEntity } from "../../infrastructure.database/typeorm/gerar-horario.typeorm.entity";

export interface IGerarHorarioCreateCommand {
  dataInicio: string;
  dataTermino?: string;
}

export const GerarHorarioCreateCommandMetadata = createOperationMetadata({
  operationId: "gerarHorarioCreate",
  summary: "Solicita geracao de horario (assincrono)",
});

export const IGerarHorarioCreateCommandHandler = Symbol("IGerarHorarioCreateCommandHandler");

export interface IGerarHorarioCreateCommandHandler {
  execute(
    accessContext: AccessContext | null,
    command: IGerarHorarioCreateCommand,
  ): Promise<GerarHorarioEntity>;
}
