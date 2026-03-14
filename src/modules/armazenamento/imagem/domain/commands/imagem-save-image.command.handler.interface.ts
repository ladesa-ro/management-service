import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";

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

export type IImagemSaveImageCommandHandler = ICommandHandler<
  IImagemSaveImageCommand,
  { imagem: { id: string } }
>;
export const IImagemSaveImageCommandHandler = Symbol("IImagemSaveImageCommandHandler");
