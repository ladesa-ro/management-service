import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";

export type IImagemSaveImagemCapaCommand = {
  file: Express.Multer.File;
};

export type IImagemSaveImagemCapaCommandHandler = ICommandHandler<
  IImagemSaveImagemCapaCommand,
  { imagem: { id: string } }
>;
export const IImagemSaveImagemCapaCommandHandler = Symbol("IImagemSaveImagemCapaCommandHandler");
