import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { OfertaFormacaoFindOneQuery, OfertaFormacaoFindOneQueryResult } from "../queries";
import type { OfertaFormacaoUpdateCommand } from "./oferta-formacao-update.command";
export type IOfertaFormacaoUpdateCommand = {
  accessContext: AccessContext;
  dto: OfertaFormacaoFindOneQuery & OfertaFormacaoUpdateCommand;
};

export type IOfertaFormacaoUpdateCommandHandler = ICommandHandler<
  IOfertaFormacaoUpdateCommand,
  OfertaFormacaoFindOneQueryResult
>;
export const IOfertaFormacaoUpdateCommandHandler = Symbol("IOfertaFormacaoUpdateCommandHandler");
