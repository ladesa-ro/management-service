import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { NivelFormacaoFindOneQueryResult } from "../queries";
import type { NivelFormacaoCreateCommand } from "./nivel-formacao-create.command";

export const INivelFormacaoCreateCommandHandler = Symbol("INivelFormacaoCreateCommandHandler");

export type INivelFormacaoCreateCommandHandler = ICommandHandler<
  NivelFormacaoCreateCommand,
  NivelFormacaoFindOneQueryResult
>;
