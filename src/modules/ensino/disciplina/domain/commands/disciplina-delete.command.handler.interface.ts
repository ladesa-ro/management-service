import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { DisciplinaFindOneQuery } from "../queries";

export type IDisciplinaDeleteCommandHandler = ICommandHandler<DisciplinaFindOneQuery, boolean>;
export const IDisciplinaDeleteCommandHandler = Symbol("IDisciplinaDeleteCommandHandler");
