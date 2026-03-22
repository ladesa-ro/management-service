import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";

export type IImagemSaveImagemCapaCommand = {
  file: Express.Multer.File;
};

export const ImagemSaveImagemCapaCommandMetadata = createOperationMetadata({
  operationId: "imagemSaveImagemCapa",
  summary: "Salva imagem de capa",
});

export const IImagemSaveImagemCapaCommandHandler = Symbol("IImagemSaveImagemCapaCommandHandler");

export type IImagemSaveImagemCapaCommandHandler = ICommandHandler<
  IImagemSaveImagemCapaCommand,
  { imagem: { id: string } }
>;
