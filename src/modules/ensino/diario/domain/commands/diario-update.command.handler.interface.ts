import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { DiarioFindOneQuery, DiarioFindOneQueryResult } from "../queries";
import type { DiarioUpdateCommand } from "./diario-update.command";

export const IDiarioUpdateCommandHandler = Symbol("IDiarioUpdateCommandHandler");

export type IDiarioUpdateCommandHandler = ICommandHandler<
  DiarioFindOneQuery & DiarioUpdateCommand,
  DiarioFindOneQueryResult
>;
