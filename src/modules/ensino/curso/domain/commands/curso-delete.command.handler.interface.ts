import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { CursoFindOneQuery } from "../queries";

export const ICursoDeleteCommandHandler = Symbol("ICursoDeleteCommandHandler");

export type ICursoDeleteCommandHandler = ICommandHandler<CursoFindOneQuery, boolean>;
