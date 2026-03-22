import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { OfertaFormacaoFindOneQuery, OfertaFormacaoFindOneQueryResult } from "../queries";
import type { OfertaFormacaoUpdateCommand } from "./oferta-formacao-update.command";

export const OfertaFormacaoUpdateCommandMetadata = createOperationMetadata({
  operationId: "ofertaFormacaoUpdate",
  summary: "Atualiza uma oferta de formacao",
});

export const IOfertaFormacaoUpdateCommandHandler = Symbol("IOfertaFormacaoUpdateCommandHandler");

export type IOfertaFormacaoUpdateCommandHandler = ICommandHandler<
  OfertaFormacaoFindOneQuery & OfertaFormacaoUpdateCommand,
  OfertaFormacaoFindOneQueryResult
>;
