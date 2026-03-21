import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { BlocoFindOneQueryResult } from "../queries";
import type { BlocoCreateCommand } from "./bloco-create.command";

export const IBlocoCreateCommandHandler = Symbol("IBlocoCreateCommandHandler");

export type IBlocoCreateCommandHandler = ICommandHandler<
  BlocoCreateCommand,
  BlocoFindOneQueryResult
>;
