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

/**
 * Port de entrada para casos de uso de Imagem
 * Define o contrato que o service deve implementar
 */
export interface IImagemUseCasePort {
  /**
   * Salva uma imagem com opcoes de transformacao
   */
  saveImage(
    file: Express.Multer.File,
    options: ISaveImageOptions,
  ): Promise<{ imagem: { id: string } }>;

  /**
   * Salva imagem de capa (genérico para qualquer entidade)
   */
  saveImagemCapa(file: Express.Multer.File): Promise<{ imagem: { id: string } }>;

  /**
   * Busca o ID do arquivo mais recente para uma imagem
   */
  getLatestArquivoIdForImagem(imagemId: string): Promise<string | null>;
}
