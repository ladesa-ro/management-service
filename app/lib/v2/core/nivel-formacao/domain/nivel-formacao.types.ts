/**
 * Tipagem da entidade NivelFormacao
 * Define a estrutura de dados sem comportamento
 */
export interface INivelFormacao {
  /** Identificador UUID do nível de formação */
  id: string;

  /** Slug para identificação (ex: tecnico, graduacao, pos-graduacao) */
  slug: string;

  /** Data de criação */
  dateCreated: Date;

  /** Data de atualização */
  dateUpdated: Date;

  /** Data de exclusão (soft delete) */
  dateDeleted: Date | null;
}

/**
 * Tipagem para criação de NivelFormacao
 */
export interface INivelFormacaoCreate {
  slug: string;
}

/**
 * Tipagem para atualização de NivelFormacao
 */
export interface INivelFormacaoUpdate {
  slug?: string;
}
