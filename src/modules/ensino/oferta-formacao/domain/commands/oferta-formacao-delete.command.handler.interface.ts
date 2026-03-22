import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { OfertaFormacaoFindOneQuery } from "../queries";

export const OfertaFormacaoDeleteCommandMetadata = createOperationMetadata({
  operationId: "ofertaFormacaoDeleteOneById",
  summary: "Remove uma oferta de formacao",
});

export const IOfertaFormacaoDeleteCommandHandler = Symbol("IOfertaFormacaoDeleteCommandHandler");

export type IOfertaFormacaoDeleteCommandHandler = ICommandHandler<
  OfertaFormacaoFindOneQuery,
  boolean
>;
