import type { PersistInput } from "./persist-input.type";

/**
 * Contrato granular para criação de entidade. Recebe PersistInput<DomainData> que converte
 * relações em referências { id } — desacoplando persistência da forma completa da entidade.
 */
export interface IRepositoryCreate<DomainData> {
  create(data: Partial<PersistInput<DomainData>>): Promise<{ id: string | number }>;
}
