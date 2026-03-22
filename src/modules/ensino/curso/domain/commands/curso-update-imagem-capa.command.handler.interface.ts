import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { CursoFindOneQuery } from "../queries";

export type CursoUpdateImagemCapaCommand = {
  dto: CursoFindOneQuery;
  file: Express.Multer.File;
};

export const CursoUpdateImagemCapaCommandMetadata = createOperationMetadata({
  operationId: "cursoUpdateImagemCapa",
  summary: "Define imagem de capa de um curso",
});

export const ICursoUpdateImagemCapaCommandHandler = Symbol("ICursoUpdateImagemCapaCommandHandler");

export type ICursoUpdateImagemCapaCommandHandler = ICommandHandler<
  CursoUpdateImagemCapaCommand,
  boolean
>;
