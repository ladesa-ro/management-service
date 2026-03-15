import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { DiarioFindOneQuery } from "../queries";

export type IDiarioDeleteCommandHandler = ICommandHandler<DiarioFindOneQuery, boolean>;
export const IDiarioDeleteCommandHandler = Symbol("IDiarioDeleteCommandHandler");
