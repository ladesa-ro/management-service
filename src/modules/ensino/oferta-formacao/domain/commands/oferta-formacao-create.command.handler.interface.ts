import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { OfertaFormacaoFindOneQueryResult } from "../queries";
import type { OfertaFormacaoCreateCommand } from "./oferta-formacao-create.command";

export const OfertaFormacaoCreateCommandMetadata = createOperationMetadata({
  operationId: "ofertaFormacaoCreate",
  summary: "Cria uma oferta de formacao",
});

export const IOfertaFormacaoCreateCommandHandler = Symbol("IOfertaFormacaoCreateCommandHandler");

export type IOfertaFormacaoCreateCommandHandler = ICommandHandler<
  OfertaFormacaoCreateCommand,
  OfertaFormacaoFindOneQueryResult
>;
