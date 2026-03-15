import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { BlocoFindOneQuery, BlocoFindOneQueryResult } from "../queries";
import type { BlocoUpdateCommand } from "./bloco-update.command";

export type IBlocoUpdateCommandHandler = ICommandHandler<
  BlocoFindOneQuery & BlocoUpdateCommand,
  BlocoFindOneQueryResult
>;
export const IBlocoUpdateCommandHandler = Symbol("IBlocoUpdateCommandHandler");
