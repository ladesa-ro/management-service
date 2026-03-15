import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { OfertaFormacaoFindOneQuery } from "../queries";

export type IOfertaFormacaoDeleteCommandHandler = ICommandHandler<
  OfertaFormacaoFindOneQuery,
  boolean
>;
export const IOfertaFormacaoDeleteCommandHandler = Symbol("IOfertaFormacaoDeleteCommandHandler");
