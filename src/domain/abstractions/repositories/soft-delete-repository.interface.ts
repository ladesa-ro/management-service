/**
 * Interface para operações de soft delete em repositórios
 */
export interface ISoftDeleteRepository {
  /**
   * Realiza soft delete de uma entidade por ID
   */
  softDeleteById(id: string | number): Promise<void>;
}
