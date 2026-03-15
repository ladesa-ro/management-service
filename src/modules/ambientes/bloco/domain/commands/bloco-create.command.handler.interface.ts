import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { BlocoFindOneQueryResult } from "../queries";
import type { BlocoCreateCommand } from "./bloco-create.command";

export type IBlocoCreateCommandHandler = ICommandHandler<
  BlocoCreateCommand,
  BlocoFindOneQueryResult
>;
export const IBlocoCreateCommandHandler = Symbol("IBlocoCreateCommandHandler");
