import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { DisciplinaFindOneQuery } from "../queries";

export type DisciplinaUpdateImagemCapaCommand = {
  dto: DisciplinaFindOneQuery;
  file: Express.Multer.File;
};

export const IDisciplinaUpdateImagemCapaCommandHandler = Symbol(
  "IDisciplinaUpdateImagemCapaCommandHandler",
);

export type IDisciplinaUpdateImagemCapaCommandHandler = ICommandHandler<
  DisciplinaUpdateImagemCapaCommand,
  boolean
>;
