import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { NivelFormacaoFindOneQuery } from "../queries";
export type INivelFormacaoDeleteCommand = {
  accessContext: AccessContext;
  dto: NivelFormacaoFindOneQuery;
};

export type INivelFormacaoDeleteCommandHandler = ICommandHandler<
  INivelFormacaoDeleteCommand,
  boolean
>;
export const INivelFormacaoDeleteCommandHandler = Symbol("INivelFormacaoDeleteCommandHandler");
