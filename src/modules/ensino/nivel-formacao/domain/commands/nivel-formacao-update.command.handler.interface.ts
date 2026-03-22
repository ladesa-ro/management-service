import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { NivelFormacaoFindOneQuery, NivelFormacaoFindOneQueryResult } from "../queries";
import type { NivelFormacaoUpdateCommand } from "./nivel-formacao-update.command";

export const NivelFormacaoUpdateCommandMetadata = createOperationMetadata({
  operationId: "nivelFormacaoUpdate",
  summary: "Atualiza um nivel de formacao",
});

export const INivelFormacaoUpdateCommandHandler = Symbol("INivelFormacaoUpdateCommandHandler");

export type INivelFormacaoUpdateCommandHandler = ICommandHandler<
  NivelFormacaoFindOneQuery & NivelFormacaoUpdateCommand,
  NivelFormacaoFindOneQueryResult
>;
