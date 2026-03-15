import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { NivelFormacaoFindOneQueryResult } from "../queries";
import type { NivelFormacaoCreateCommand } from "./nivel-formacao-create.command";

export type INivelFormacaoCreateCommandHandler = ICommandHandler<
  NivelFormacaoCreateCommand,
  NivelFormacaoFindOneQueryResult
>;
export const INivelFormacaoCreateCommandHandler = Symbol("INivelFormacaoCreateCommandHandler");
