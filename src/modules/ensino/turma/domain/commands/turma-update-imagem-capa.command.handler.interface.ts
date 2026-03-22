import type { ICommandHandler } from "@/domain/abstractions";
import type { TurmaFindOneQuery } from "../queries";

export type TurmaUpdateImagemCapaCommand = {
  dto: TurmaFindOneQuery;
  file: Express.Multer.File;
};

export const ITurmaUpdateImagemCapaCommandHandler = Symbol("ITurmaUpdateImagemCapaCommandHandler");

export type ITurmaUpdateImagemCapaCommandHandler = ICommandHandler<
  TurmaUpdateImagemCapaCommand,
  boolean
>;
