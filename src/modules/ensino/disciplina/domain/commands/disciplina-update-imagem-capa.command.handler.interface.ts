import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { DisciplinaFindOneQuery } from "../queries";

export type DisciplinaUpdateImagemCapaCommand = {
  dto: DisciplinaFindOneQuery;
  file: Express.Multer.File;
};

export const DisciplinaUpdateImagemCapaCommandMetadata = createOperationMetadata({
  operationId: "disciplinaUpdateImagemCapa",
  summary: "Define imagem de capa de uma disciplina",
});

export const IDisciplinaUpdateImagemCapaCommandHandler = Symbol(
  "IDisciplinaUpdateImagemCapaCommandHandler",
);

export type IDisciplinaUpdateImagemCapaCommandHandler = ICommandHandler<
  DisciplinaUpdateImagemCapaCommand,
  boolean
>;
