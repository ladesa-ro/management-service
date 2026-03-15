import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { OfertaFormacaoNivelFormacaoFindOneQuery } from "../queries";

export type IOfertaFormacaoNivelFormacaoDeleteCommandHandler = ICommandHandler<
  OfertaFormacaoNivelFormacaoFindOneQuery,
  boolean
>;
export const IOfertaFormacaoNivelFormacaoDeleteCommandHandler = Symbol(
  "IOfertaFormacaoNivelFormacaoDeleteCommandHandler",
);
