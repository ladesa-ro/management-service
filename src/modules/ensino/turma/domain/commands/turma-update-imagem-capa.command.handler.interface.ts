import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { TurmaFindOneQuery } from "../queries";

export type TurmaUpdateImagemCapaCommand = {
  dto: TurmaFindOneQuery;
  file: Express.Multer.File;
};

export type ITurmaUpdateImagemCapaCommandHandler = ICommandHandler<
  TurmaUpdateImagemCapaCommand,
  boolean
>;
export const ITurmaUpdateImagemCapaCommandHandler = Symbol("ITurmaUpdateImagemCapaCommandHandler");
