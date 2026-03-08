export type ISaveImageOptions = {
  minWidth: number;
  minHeight: number;
  transforms: {
    outputAs: "jpeg";
  }[];
};

export interface IImagemSaveImageCommandHandler {
  execute(
    file: Express.Multer.File,
    options: ISaveImageOptions,
  ): Promise<{ imagem: { id: string } }>;
}
