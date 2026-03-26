import type { PersistInput } from "./persist-input.type";

/**
 * Contrato granular para atualização parcial. Usa Partial<PersistInput<DomainData>> para
 * permitir atualização seletiva de campos, com relações resolvidas como referências { id }.
 */

export interface IRepositoryUpdate<DomainData> {
  update(id: string | number, data: Partial<PersistInput<DomainData>>): Promise<void>;
}
