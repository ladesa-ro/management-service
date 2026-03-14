import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { OfertaFormacaoFindOneQuery } from "../queries";
export type IOfertaFormacaoDeleteCommand = {
  accessContext: AccessContext;
  dto: OfertaFormacaoFindOneQuery;
};

export type IOfertaFormacaoDeleteCommandHandler = ICommandHandler<
  IOfertaFormacaoDeleteCommand,
  boolean
>;
export const IOfertaFormacaoDeleteCommandHandler = Symbol("IOfertaFormacaoDeleteCommandHandler");
