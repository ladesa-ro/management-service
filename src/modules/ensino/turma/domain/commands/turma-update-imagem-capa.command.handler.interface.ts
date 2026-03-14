import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { TurmaFindOneInputDto } from "../../application/dtos";

export type ITurmaUpdateImagemCapaCommand = {
  accessContext: AccessContext;
  dto: TurmaFindOneInputDto;
  file: Express.Multer.File;
};

export type ITurmaUpdateImagemCapaCommandHandler = ICommandHandler<
  ITurmaUpdateImagemCapaCommand,
  boolean
>;
export const ITurmaUpdateImagemCapaCommandHandler = Symbol("ITurmaUpdateImagemCapaCommandHandler");
