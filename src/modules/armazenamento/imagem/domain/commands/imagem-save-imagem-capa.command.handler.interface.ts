import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";

export type IImagemSaveImagemCapaCommand = {
  file: Express.Multer.File;
};

export const IImagemSaveImagemCapaCommandHandler = Symbol("IImagemSaveImagemCapaCommandHandler");

export type IImagemSaveImagemCapaCommandHandler = ICommandHandler<
  IImagemSaveImagemCapaCommand,
  { imagem: { id: string } }
>;
