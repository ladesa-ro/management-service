import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { CursoFindOneQuery } from "../queries";
export type ICursoDeleteCommand = {
  accessContext: AccessContext;
  dto: CursoFindOneQuery;
};

export type ICursoDeleteCommandHandler = ICommandHandler<ICursoDeleteCommand, boolean>;
export const ICursoDeleteCommandHandler = Symbol("ICursoDeleteCommandHandler");
