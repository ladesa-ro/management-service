import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { DiarioFindOneQuery } from "../queries";

export const DiarioDeleteCommandMetadata = createOperationMetadata({
  operationId: "diarioDeleteOneById",
  summary: "Remove um diario",
});

export const IDiarioDeleteCommandHandler = Symbol("IDiarioDeleteCommandHandler");

export type IDiarioDeleteCommandHandler = ICommandHandler<DiarioFindOneQuery, boolean>;
