import type { ICommandHandler } from "@/domain/abstractions";
import type { DisciplinaFindOneQuery } from "../queries";

export const IDisciplinaDeleteCommandHandler = Symbol("IDisciplinaDeleteCommandHandler");

export type IDisciplinaDeleteCommandHandler = ICommandHandler<DisciplinaFindOneQuery, boolean>;
