export interface IImagemSaveImagemCapaCommandHandler {
  execute(file: Express.Multer.File): Promise<{ imagem: { id: string } }>;
}
