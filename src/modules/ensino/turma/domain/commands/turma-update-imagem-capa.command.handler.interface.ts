import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { TurmaFindOneQuery } from "../queries";
export type ITurmaUpdateImagemCapaCommand = {
  accessContext: AccessContext;
  dto: TurmaFindOneQuery;
  file: Express.Multer.File;
};

export type ITurmaUpdateImagemCapaCommandHandler = ICommandHandler<
  ITurmaUpdateImagemCapaCommand,
  boolean
>;
export const ITurmaUpdateImagemCapaCommandHandler = Symbol("ITurmaUpdateImagemCapaCommandHandler");
