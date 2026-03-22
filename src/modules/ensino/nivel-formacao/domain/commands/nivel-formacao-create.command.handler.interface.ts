import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { NivelFormacaoFindOneQueryResult } from "../queries";
import type { NivelFormacaoCreateCommand } from "./nivel-formacao-create.command";

export const NivelFormacaoCreateCommandMetadata = createOperationMetadata({
  operationId: "nivelFormacaoCreate",
  summary: "Cria um nivel de formacao",
});

export const INivelFormacaoCreateCommandHandler = Symbol("INivelFormacaoCreateCommandHandler");

export type INivelFormacaoCreateCommandHandler = ICommandHandler<
  NivelFormacaoCreateCommand,
  NivelFormacaoFindOneQueryResult
>;
