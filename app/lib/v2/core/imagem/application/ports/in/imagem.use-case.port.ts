/**
 * Opções para salvar imagem
 */
type ISaveImageOptions = {
  minWidth: number;
  minHeight: number;
  transforms: {
    outputAs: "jpeg";
  }[];
};

/**
 * Porta de entrada (use case) para operações de Imagem
 * Define os casos de uso disponíveis para o domínio
 */
export interface IImagemUseCasePort {
  /**
   * Salva uma imagem com opções de transformação
   */
  saveImage(
    file: Express.Multer.File,
    options: ISaveImageOptions,
  ): Promise<{ imagem: { id: string } }>;

  /**
   * Salva imagem de capa de bloco
   */
  saveBlocoCapa(file: Express.Multer.File): Promise<{ imagem: { id: string } }>;

  /**
   * Salva imagem de capa de ambiente
   */
  saveAmbienteCapa(file: Express.Multer.File): Promise<{ imagem: { id: string } }>;

  /**
   * Salva imagem de capa de usuário
   */
  saveUsuarioCapa(file: Express.Multer.File): Promise<{ imagem: { id: string } }>;

  /**
   * Salva imagem de perfil de usuário
   */
  saveUsuarioPerfil(file: Express.Multer.File): Promise<{ imagem: { id: string } }>;

  /**
   * Salva imagem de capa de curso
   */
  saveCursoCapa(file: Express.Multer.File): Promise<{ imagem: { id: string } }>;

  /**
   * Salva imagem de capa de disciplina
   */
  saveDisciplinaCapa(file: Express.Multer.File): Promise<{ imagem: { id: string } }>;

  /**
   * Salva imagem de capa de turma
   */
  saveTurmaCapa(file: Express.Multer.File): Promise<{ imagem: { id: string } }>;
}
