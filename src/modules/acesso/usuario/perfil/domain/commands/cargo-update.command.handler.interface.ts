import type { ICommandHandler } from "@/domain/abstractions";
import type { CargoCreateQueryResult } from "./cargo-create.command.handler.interface";
import type { CargoUpdateCommand } from "./cargo-update.command";

export const ICargoUpdateCommandHandler = Symbol("ICargoUpdateCommandHandler");

export type ICargoUpdateCommandHandler = ICommandHandler<
  CargoUpdateCommand,
  CargoCreateQueryResult | null
>;
