import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { DiarioFindOneQueryResult } from "../queries";
import type { DiarioBatchCreateCommand } from "./diario-batch-create.command";

export const DiarioBatchCreateCommandMetadata = createOperationMetadata({
  operationId: "diarioBatchCreate",
  summary: "Cria diarios em lote para uma turma",
});

export const IDiarioBatchCreateCommandHandler = Symbol("IDiarioBatchCreateCommandHandler");

export type IDiarioBatchCreateCommandHandler = ICommandHandler<
  DiarioBatchCreateCommand,
  DiarioFindOneQueryResult[]
>;
