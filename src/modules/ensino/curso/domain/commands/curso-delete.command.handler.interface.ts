import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { CursoFindOneQuery } from "../queries";

export type ICursoDeleteCommandHandler = ICommandHandler<CursoFindOneQuery, boolean>;
export const ICursoDeleteCommandHandler = Symbol("ICursoDeleteCommandHandler");
