export interface IImagemGetLatestArquivoIdQueryHandler {
  execute(imagemId: string): Promise<string | null>;
}
