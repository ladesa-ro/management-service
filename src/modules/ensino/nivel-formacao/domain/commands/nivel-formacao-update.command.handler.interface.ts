import type { ICommandHandler } from "@/domain/abstractions";
import type { NivelFormacaoFindOneQuery, NivelFormacaoFindOneQueryResult } from "../queries";
import type { NivelFormacaoUpdateCommand } from "./nivel-formacao-update.command";

export const INivelFormacaoUpdateCommandHandler = Symbol("INivelFormacaoUpdateCommandHandler");

export type INivelFormacaoUpdateCommandHandler = ICommandHandler<
  NivelFormacaoFindOneQuery & NivelFormacaoUpdateCommand,
  NivelFormacaoFindOneQueryResult
>;
