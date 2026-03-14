import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { NivelFormacaoFindOneInputDto } from "../../application/dtos";

export type INivelFormacaoDeleteCommand = {
  accessContext: AccessContext;
  dto: NivelFormacaoFindOneInputDto;
};

export type INivelFormacaoDeleteCommandHandler = ICommandHandler<
  INivelFormacaoDeleteCommand,
  boolean
>;
export const INivelFormacaoDeleteCommandHandler = Symbol("INivelFormacaoDeleteCommandHandler");
