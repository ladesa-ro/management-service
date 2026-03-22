import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { BlocoFindOneQuery } from "../queries";

export const BlocoDeleteCommandMetadata = createOperationMetadata({
  operationId: "blocoDeleteOneById",
  summary: "Remove um bloco",
});

export const IBlocoDeleteCommandHandler = Symbol("IBlocoDeleteCommandHandler");

export type IBlocoDeleteCommandHandler = ICommandHandler<BlocoFindOneQuery, boolean>;
