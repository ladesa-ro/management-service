import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { DiarioFindOneQuery } from "../queries";

export const IDiarioDeleteCommandHandler = Symbol("IDiarioDeleteCommandHandler");

export type IDiarioDeleteCommandHandler = ICommandHandler<DiarioFindOneQuery, boolean>;
