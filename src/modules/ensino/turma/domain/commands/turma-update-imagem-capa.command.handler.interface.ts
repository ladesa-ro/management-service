import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { TurmaFindOneQuery } from "../queries";

export const TurmaUpdateImagemCapaCommandMetadata = createOperationMetadata({
  operationId: "turmaUpdateImagemCapa",
  summary: "Define a imagem de capa de uma turma",
});

export type TurmaUpdateImagemCapaCommand = {
  dto: TurmaFindOneQuery;
  file: Express.Multer.File;
};

export const ITurmaUpdateImagemCapaCommandHandler = Symbol("ITurmaUpdateImagemCapaCommandHandler");

export type ITurmaUpdateImagemCapaCommandHandler = ICommandHandler<
  TurmaUpdateImagemCapaCommand,
  boolean
>;
