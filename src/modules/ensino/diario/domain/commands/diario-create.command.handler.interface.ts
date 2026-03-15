import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { DiarioFindOneQueryResult } from "../queries";
import type { DiarioCreateCommand } from "./diario-create.command";

export type IDiarioCreateCommandHandler = ICommandHandler<
  DiarioCreateCommand,
  DiarioFindOneQueryResult
>;
export const IDiarioCreateCommandHandler = Symbol("IDiarioCreateCommandHandler");
