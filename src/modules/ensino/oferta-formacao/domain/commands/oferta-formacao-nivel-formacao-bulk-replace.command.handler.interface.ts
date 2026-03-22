import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { OfertaFormacaoNivelFormacaoListQueryResult } from "../queries";
import type { OfertaFormacaoNivelFormacaoBulkReplaceCommand } from "./oferta-formacao-nivel-formacao-bulk-replace.command";

export const OfertaFormacaoNivelFormacaoBulkReplaceCommandMetadata = createOperationMetadata({
  operationId: "ofertaFormacaoNivelFormacaoBulkReplace",
  summary: "Substitui niveis de formacao de uma oferta de formacao",
});

export const IOfertaFormacaoNivelFormacaoBulkReplaceCommandHandler = Symbol(
  "IOfertaFormacaoNivelFormacaoBulkReplaceCommandHandler",
);

export type IOfertaFormacaoNivelFormacaoBulkReplaceCommandHandler = ICommandHandler<
  OfertaFormacaoNivelFormacaoBulkReplaceCommand,
  OfertaFormacaoNivelFormacaoListQueryResult
>;
