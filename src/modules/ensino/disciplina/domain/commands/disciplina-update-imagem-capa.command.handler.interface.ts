import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { DisciplinaFindOneQuery } from "../queries";
export type IDisciplinaUpdateImagemCapaCommand = {
  accessContext: AccessContext;
  dto: DisciplinaFindOneQuery;
  file: Express.Multer.File;
};

export type IDisciplinaUpdateImagemCapaCommandHandler = ICommandHandler<
  IDisciplinaUpdateImagemCapaCommand,
  boolean
>;
export const IDisciplinaUpdateImagemCapaCommandHandler = Symbol(
  "IDisciplinaUpdateImagemCapaCommandHandler",
);
