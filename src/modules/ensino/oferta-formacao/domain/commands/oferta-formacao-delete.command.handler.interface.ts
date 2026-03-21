import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { OfertaFormacaoFindOneQuery } from "../queries";

export const IOfertaFormacaoDeleteCommandHandler = Symbol("IOfertaFormacaoDeleteCommandHandler");

export type IOfertaFormacaoDeleteCommandHandler = ICommandHandler<
  OfertaFormacaoFindOneQuery,
  boolean
>;
