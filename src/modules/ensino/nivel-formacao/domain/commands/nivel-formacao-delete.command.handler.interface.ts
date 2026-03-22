import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { NivelFormacaoFindOneQuery } from "../queries";

export const NivelFormacaoDeleteCommandMetadata = createOperationMetadata({
  operationId: "nivelFormacaoDeleteOneById",
  summary: "Remove um nivel de formacao",
});

export const INivelFormacaoDeleteCommandHandler = Symbol("INivelFormacaoDeleteCommandHandler");

export type INivelFormacaoDeleteCommandHandler = ICommandHandler<
  NivelFormacaoFindOneQuery,
  boolean
>;
