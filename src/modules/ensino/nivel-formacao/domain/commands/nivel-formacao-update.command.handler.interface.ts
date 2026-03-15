import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { NivelFormacaoFindOneQuery, NivelFormacaoFindOneQueryResult } from "../queries";
import type { NivelFormacaoUpdateCommand } from "./nivel-formacao-update.command";

export type INivelFormacaoUpdateCommandHandler = ICommandHandler<
  NivelFormacaoFindOneQuery & NivelFormacaoUpdateCommand,
  NivelFormacaoFindOneQueryResult
>;
export const INivelFormacaoUpdateCommandHandler = Symbol("INivelFormacaoUpdateCommandHandler");
