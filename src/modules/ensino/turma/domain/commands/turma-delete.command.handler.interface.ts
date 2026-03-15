import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { TurmaFindOneQuery } from "../queries";

export type ITurmaDeleteCommandHandler = ICommandHandler<TurmaFindOneQuery, boolean>;
export const ITurmaDeleteCommandHandler = Symbol("ITurmaDeleteCommandHandler");
