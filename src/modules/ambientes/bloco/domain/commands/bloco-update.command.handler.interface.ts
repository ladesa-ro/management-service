import type { ICommandHandler } from "@/domain/abstractions";
import type { BlocoFindOneQuery, BlocoFindOneQueryResult } from "../queries";
import type { BlocoUpdateCommand } from "./bloco-update.command";

export const IBlocoUpdateCommandHandler = Symbol("IBlocoUpdateCommandHandler");

export type IBlocoUpdateCommandHandler = ICommandHandler<
  BlocoFindOneQuery & BlocoUpdateCommand,
  BlocoFindOneQueryResult
>;
