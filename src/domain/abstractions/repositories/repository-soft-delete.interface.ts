/**
 * Contrato granular para soft delete. Registros não são removidos fisicamente —
 * recebem marcação temporal (dateDeleted) para preservar integridade referencial e auditoria.
 */

export interface IRepositorySoftDelete {
  softDeleteById(id: string | number): Promise<void>;
}
