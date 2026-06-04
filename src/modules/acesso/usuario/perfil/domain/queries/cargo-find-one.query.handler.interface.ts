import type { IQueryHandler } from "@/domain/abstractions";
import type { CargoCreateQueryResult } from "../commands/cargo-create.command.handler.interface";
import type { CargoFindOneQuery } from "./cargo-find-one.query";

export const ICargoFindOneQueryHandler = Symbol("ICargoFindOneQueryHandler");

export type ICargoFindOneQueryHandler = IQueryHandler<
  CargoFindOneQuery,
  CargoCreateQueryResult | null
>;
