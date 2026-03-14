import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { NivelFormacaoFindOneQueryResult } from "../queries";
import type { NivelFormacaoCreateCommand } from "./nivel-formacao-create.command";
export type INivelFormacaoCreateCommand = {
  accessContext: AccessContext;
  dto: NivelFormacaoCreateCommand;
};

export type INivelFormacaoCreateCommandHandler = ICommandHandler<
  INivelFormacaoCreateCommand,
  NivelFormacaoFindOneQueryResult
>;
export const INivelFormacaoCreateCommandHandler = Symbol("INivelFormacaoCreateCommandHandler");
