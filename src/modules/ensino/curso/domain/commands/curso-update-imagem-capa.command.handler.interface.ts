import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { CursoFindOneInputDto } from "../../application/dtos";

export type ICursoUpdateImagemCapaCommand = {
  accessContext: AccessContext;
  dto: CursoFindOneInputDto;
  file: Express.Multer.File;
};

export type ICursoUpdateImagemCapaCommandHandler = ICommandHandler<
  ICursoUpdateImagemCapaCommand,
  boolean
>;
export const ICursoUpdateImagemCapaCommandHandler = Symbol("ICursoUpdateImagemCapaCommandHandler");
