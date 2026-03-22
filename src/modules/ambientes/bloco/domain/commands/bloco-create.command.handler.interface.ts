import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { BlocoFindOneQueryResult } from "../queries";
import type { BlocoCreateCommand } from "./bloco-create.command";

export const BlocoCreateCommandMetadata = createOperationMetadata({
  operationId: "blocoCreate",
  summary: "Cria um bloco",
});

export const IBlocoCreateCommandHandler = Symbol("IBlocoCreateCommandHandler");

export type IBlocoCreateCommandHandler = ICommandHandler<
  BlocoCreateCommand,
  BlocoFindOneQueryResult
>;
