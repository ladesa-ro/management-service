import type { ICommandHandler } from "@/domain/abstractions";
import type { DiarioFindOneQueryResult } from "../queries";
import type { DiarioCreateCommand } from "./diario-create.command";

export const IDiarioCreateCommandHandler = Symbol("IDiarioCreateCommandHandler");

export type IDiarioCreateCommandHandler = ICommandHandler<
  DiarioCreateCommand,
  DiarioFindOneQueryResult
>;
