import type { ICommandHandler } from "@/domain/abstractions";
import type { CargoDeleteCommand } from "./cargo-delete.command";

export const ICargoDeleteCommandHandler = Symbol("ICargoDeleteCommandHandler");

export type ICargoDeleteCommandHandler = ICommandHandler<CargoDeleteCommand, boolean>;
