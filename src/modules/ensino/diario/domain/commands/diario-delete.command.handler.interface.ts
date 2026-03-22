import type { ICommandHandler } from "@/domain/abstractions";
import type { DiarioFindOneQuery } from "../queries";

export const IDiarioDeleteCommandHandler = Symbol("IDiarioDeleteCommandHandler");

export type IDiarioDeleteCommandHandler = ICommandHandler<DiarioFindOneQuery, boolean>;
