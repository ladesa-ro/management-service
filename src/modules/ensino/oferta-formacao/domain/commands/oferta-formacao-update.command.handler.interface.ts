import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { OfertaFormacaoFindOneQuery, OfertaFormacaoFindOneQueryResult } from "../queries";
import type { OfertaFormacaoUpdateCommand } from "./oferta-formacao-update.command";

export const IOfertaFormacaoUpdateCommandHandler = Symbol("IOfertaFormacaoUpdateCommandHandler");

export type IOfertaFormacaoUpdateCommandHandler = ICommandHandler<
  OfertaFormacaoFindOneQuery & OfertaFormacaoUpdateCommand,
  OfertaFormacaoFindOneQueryResult
>;
