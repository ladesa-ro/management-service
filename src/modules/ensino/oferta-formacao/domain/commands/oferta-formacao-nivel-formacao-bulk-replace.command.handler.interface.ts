import type { ICommandHandler } from "@/domain/abstractions";
import type { OfertaFormacaoNivelFormacaoListQueryResult } from "../queries";
import type { OfertaFormacaoNivelFormacaoBulkReplaceCommand } from "./oferta-formacao-nivel-formacao-bulk-replace.command";

export const IOfertaFormacaoNivelFormacaoBulkReplaceCommandHandler = Symbol(
  "IOfertaFormacaoNivelFormacaoBulkReplaceCommandHandler",
);

export type IOfertaFormacaoNivelFormacaoBulkReplaceCommandHandler = ICommandHandler<
  OfertaFormacaoNivelFormacaoBulkReplaceCommand,
  OfertaFormacaoNivelFormacaoListQueryResult
>;
