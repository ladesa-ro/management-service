import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { BlocoFindOneQuery, BlocoFindOneQueryResult } from "../queries";
import type { BlocoUpdateCommand } from "./bloco-update.command";

export const BlocoUpdateCommandMetadata = createOperationMetadata({
  operationId: "blocoUpdate",
  summary: "Atualiza um bloco",
});

export const IBlocoUpdateCommandHandler = Symbol("IBlocoUpdateCommandHandler");

export type IBlocoUpdateCommandHandler = ICommandHandler<
  BlocoFindOneQuery & BlocoUpdateCommand,
  BlocoFindOneQueryResult
>;
