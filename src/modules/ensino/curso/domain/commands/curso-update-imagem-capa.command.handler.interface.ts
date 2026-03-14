import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { CursoFindOneQuery } from "../queries";
export type ICursoUpdateImagemCapaCommand = {
  accessContext: AccessContext;
  dto: CursoFindOneQuery;
  file: Express.Multer.File;
};

export type ICursoUpdateImagemCapaCommandHandler = ICommandHandler<
  ICursoUpdateImagemCapaCommand,
  boolean
>;
export const ICursoUpdateImagemCapaCommandHandler = Symbol("ICursoUpdateImagemCapaCommandHandler");
