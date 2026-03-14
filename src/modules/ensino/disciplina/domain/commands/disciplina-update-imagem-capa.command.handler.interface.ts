import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { DisciplinaFindOneInputDto } from "../../application/dtos";

export type IDisciplinaUpdateImagemCapaCommand = {
  accessContext: AccessContext;
  dto: DisciplinaFindOneInputDto;
  file: Express.Multer.File;
};

export type IDisciplinaUpdateImagemCapaCommandHandler = ICommandHandler<
  IDisciplinaUpdateImagemCapaCommand,
  boolean
>;
export const IDisciplinaUpdateImagemCapaCommandHandler = Symbol(
  "IDisciplinaUpdateImagemCapaCommandHandler",
);
