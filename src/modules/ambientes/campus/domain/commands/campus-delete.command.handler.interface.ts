import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { CampusFindOneQuery } from "../queries";

export type ICampusDeleteCommandHandler = ICommandHandler<CampusFindOneQuery, boolean>;
export const ICampusDeleteCommandHandler = Symbol("ICampusDeleteCommandHandler");
