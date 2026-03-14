import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { OfertaFormacaoNivelFormacaoFindOneQuery } from "../queries";
export type IOfertaFormacaoNivelFormacaoDeleteCommand = {
  accessContext: AccessContext;
  dto: OfertaFormacaoNivelFormacaoFindOneQuery;
};

export type IOfertaFormacaoNivelFormacaoDeleteCommandHandler = ICommandHandler<
  IOfertaFormacaoNivelFormacaoDeleteCommand,
  boolean
>;
export const IOfertaFormacaoNivelFormacaoDeleteCommandHandler = Symbol(
  "IOfertaFormacaoNivelFormacaoDeleteCommandHandler",
);
