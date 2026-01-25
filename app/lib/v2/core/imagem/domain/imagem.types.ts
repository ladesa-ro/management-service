/**
 * Interface que define a estrutura de dados de Imagem
 * Tipagem pura sem implementação de regras
 */
export interface IImagem {
  id: string;
  descricao: string | null;
  dateCreated: Date;
  dateUpdated: Date;
  dateDeleted: Date | null;
}

/**
 * Dados necessários para criar uma imagem
 */
export interface IImagemCreate {
  descricao?: string | null;
}
