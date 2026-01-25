/**
 * Tipagem da entidade Modalidade
 * Define a estrutura de dados sem comportamento
 */
export interface IModalidade {
  /** Identificador UUID da modalidade */
  id: string;

  /** Nome da modalidade */
  nome: string;

  /** Slug para URL amigável */
  slug: string;

  /** Data de criação */
  dateCreated: Date;

  /** Data de atualização */
  dateUpdated: Date;

  /** Data de exclusão (soft delete) */
  dateDeleted: Date | null;
}

/**
 * Tipagem para criação de Modalidade
 */
export interface IModalidadeCreate {
  nome: string;
  slug: string;
}

/**
 * Tipagem para atualização de Modalidade
 */
export interface IModalidadeUpdate {
  nome?: string;
  slug?: string;
}
