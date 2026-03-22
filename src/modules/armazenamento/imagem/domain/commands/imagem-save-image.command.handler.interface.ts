import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";

/**
 * Opcoes para salvar imagem
 */
export type ISaveImageOptions = {
  minWidth: number;
  minHeight: number;
  transforms: {
    outputAs: "jpeg";
  }[];
};

export type IImagemSaveImageCommand = {
  file: Express.Multer.File;
  options: ISaveImageOptions;
};

export const ImagemSaveImageCommandMetadata = createOperationMetadata({
  operationId: "imagemSaveImage",
  summary: "Salva imagem com transformacoes",
});

export const IImagemSaveImageCommandHandler = Symbol("IImagemSaveImageCommandHandler");

export type IImagemSaveImageCommandHandler = ICommandHandler<
  IImagemSaveImageCommand,
  { imagem: { id: string } }
>;
