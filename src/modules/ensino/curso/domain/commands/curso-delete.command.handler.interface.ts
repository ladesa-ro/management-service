import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { CursoFindOneInputDto } from "../../application/dtos";

export type ICursoDeleteCommand = {
  accessContext: AccessContext;
  dto: CursoFindOneInputDto;
};

export type ICursoDeleteCommandHandler = ICommandHandler<ICursoDeleteCommand, boolean>;
export const ICursoDeleteCommandHandler = Symbol("ICursoDeleteCommandHandler");
