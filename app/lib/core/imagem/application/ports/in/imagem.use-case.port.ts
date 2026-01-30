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
   * Salva imagem de capa de bloco
   */
  saveBlocoCapa(file: Express.Multer.File): Promise<{ imagem: { id: string } }>;

  /**
   * Salva imagem de capa de ambiente
   */
  saveAmbienteCapa(file: Express.Multer.File): Promise<{ imagem: { id: string } }>;

  /**
   * Salva imagem de capa de usuario
   */
  saveUsuarioCapa(file: Express.Multer.File): Promise<{ imagem: { id: string } }>;

  /**
   * Salva imagem de perfil de usuario
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
