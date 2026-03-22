import type { ICommandHandler } from "@/domain/abstractions";
import type { CursoFindOneQuery } from "../queries";

export const ICursoDeleteCommandHandler = Symbol("ICursoDeleteCommandHandler");

export type ICursoDeleteCommandHandler = ICommandHandler<CursoFindOneQuery, boolean>;
