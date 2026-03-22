import type { ICommandHandler } from "@/domain/abstractions";
import type { TurmaFindOneQuery } from "../queries";

export const ITurmaDeleteCommandHandler = Symbol("ITurmaDeleteCommandHandler");

export type ITurmaDeleteCommandHandler = ICommandHandler<TurmaFindOneQuery, boolean>;
