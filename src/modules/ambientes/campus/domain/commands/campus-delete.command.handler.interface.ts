import type { ICommandHandler } from "@/domain/abstractions";
import type { CampusFindOneQuery } from "../queries";

export const ICampusDeleteCommandHandler = Symbol("ICampusDeleteCommandHandler");

export type ICampusDeleteCommandHandler = ICommandHandler<CampusFindOneQuery, boolean>;
