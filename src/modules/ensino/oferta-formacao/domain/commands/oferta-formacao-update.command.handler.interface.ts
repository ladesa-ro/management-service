import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { OfertaFormacaoFindOneQuery, OfertaFormacaoFindOneQueryResult } from "../queries";
import type { OfertaFormacaoUpdateCommand } from "./oferta-formacao-update.command";

export type IOfertaFormacaoUpdateCommandHandler = ICommandHandler<
  OfertaFormacaoFindOneQuery & OfertaFormacaoUpdateCommand,
  OfertaFormacaoFindOneQueryResult
>;
export const IOfertaFormacaoUpdateCommandHandler = Symbol("IOfertaFormacaoUpdateCommandHandler");
