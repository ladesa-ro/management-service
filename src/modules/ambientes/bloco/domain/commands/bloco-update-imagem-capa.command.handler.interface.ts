import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { BlocoFindOneQuery } from "../queries";

export const BlocoUpdateImagemCapaCommandMetadata = createOperationMetadata({
  operationId: "blocoUpdateImagemCapa",
  summary: "Define a imagem de capa de um bloco",
});

export type BlocoUpdateImagemCapaCommand = {
  dto: BlocoFindOneQuery;
  file: Express.Multer.File;
};

export const IBlocoUpdateImagemCapaCommandHandler = Symbol("IBlocoUpdateImagemCapaCommandHandler");

export type IBlocoUpdateImagemCapaCommandHandler = ICommandHandler<
  BlocoUpdateImagemCapaCommand,
  boolean
>;
