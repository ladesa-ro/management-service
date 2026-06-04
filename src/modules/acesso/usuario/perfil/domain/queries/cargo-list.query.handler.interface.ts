import type { IQueryHandler, PaginationQueryResult } from "@/domain/abstractions";
import type { CargoCreateQueryResult } from "../commands/cargo-create.command.handler.interface";
import type { CargoListQuery } from "./cargo-list.query";

export type CargoListQueryResult = PaginationQueryResult<CargoCreateQueryResult>;

export const ICargoListQueryHandler = Symbol("ICargoListQueryHandler");

export type ICargoListQueryHandler = IQueryHandler<CargoListQuery | null, CargoListQueryResult>;
