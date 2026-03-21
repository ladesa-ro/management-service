import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { CursoFindOneQuery } from "../queries";

export type CursoUpdateImagemCapaCommand = {
  dto: CursoFindOneQuery;
  file: Express.Multer.File;
};

export const ICursoUpdateImagemCapaCommandHandler = Symbol("ICursoUpdateImagemCapaCommandHandler");

export type ICursoUpdateImagemCapaCommandHandler = ICommandHandler<
  CursoUpdateImagemCapaCommand,
  boolean
>;
