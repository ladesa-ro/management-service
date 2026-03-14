import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { NivelFormacaoFindOneQuery, NivelFormacaoFindOneQueryResult } from "../queries";
import type { NivelFormacaoUpdateCommand } from "./nivel-formacao-update.command";
export type INivelFormacaoUpdateCommand = {
  accessContext: AccessContext;
  dto: NivelFormacaoFindOneQuery & NivelFormacaoUpdateCommand;
};

export type INivelFormacaoUpdateCommandHandler = ICommandHandler<
  INivelFormacaoUpdateCommand,
  NivelFormacaoFindOneQueryResult
>;
export const INivelFormacaoUpdateCommandHandler = Symbol("INivelFormacaoUpdateCommandHandler");
