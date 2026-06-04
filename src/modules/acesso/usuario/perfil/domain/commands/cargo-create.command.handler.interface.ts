import type { ICommandHandler } from "@/domain/abstractions";
import type { CargoCreateCommand } from "./cargo-create.command";

export interface CargoCreateQueryResult {
  id: string;
  nome: string;
}

export const ICargoCreateCommandHandler = Symbol("ICargoCreateCommandHandler");

export type ICargoCreateCommandHandler = ICommandHandler<
  CargoCreateCommand,
  CargoCreateQueryResult
>;
