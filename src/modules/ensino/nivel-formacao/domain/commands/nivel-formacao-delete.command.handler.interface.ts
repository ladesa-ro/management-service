import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { NivelFormacaoFindOneQuery } from "../queries";

export const INivelFormacaoDeleteCommandHandler = Symbol("INivelFormacaoDeleteCommandHandler");

export type INivelFormacaoDeleteCommandHandler = ICommandHandler<
  NivelFormacaoFindOneQuery,
  boolean
>;
