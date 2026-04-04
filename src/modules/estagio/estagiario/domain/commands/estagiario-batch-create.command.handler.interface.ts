import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { EstagiarioFindOneQueryResult } from "../queries";
import type { EstagiarioBatchCreateCommand } from "./estagiario-batch-create.command";

export const EstagiarioBatchCreateCommandMetadata = createOperationMetadata({
  operationId: "estagiarioBatchCreate",
  summary: "Cria estagiários em lote com usuários vinculados",
});

export const IEstagiarioBatchCreateCommandHandler = Symbol("IEstagiarioBatchCreateCommandHandler");

export type IEstagiarioBatchCreateCommandHandler = ICommandHandler<
  EstagiarioBatchCreateCommand,
  EstagiarioFindOneQueryResult[]
>;
