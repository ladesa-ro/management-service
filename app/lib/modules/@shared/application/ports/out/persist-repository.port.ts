/**
 * Tipo utilitário que converte campos de relação de uma interface de domínio
 * em referências simplificadas { id: ... }.
 *
 * Campos escalares (string, number, boolean, Date, etc.) permanecem inalterados.
 * Campos que referenciam entidades (objetos com propriedade `id`) são convertidos
 * para { id: TipoDoId }.
 * A nulabilidade é preservada: se o campo original é `IEntidade | null`,
 * o resultado será `{ id: ... } | null`.
 *
 * @example
 * ```ts
 * interface IAmbiente extends IEntityBase {
 *   nome: string;
 *   bloco: IBloco;
 *   imagemCapa: { id: IdUuid } | null;
 * }
 *
 * // PersistInput<IAmbiente> resulta em:
 * // {
 * //   id: IdUuid;
 * //   nome: string;
 * //   bloco: { id: IdUuid };
 * //   imagemCapa: { id: IdUuid } | null;
 * // }
 * ```
 */
export type PersistInput<T> = {
  [K in keyof T]: NonNullable<T[K]> extends { id: infer I }
    ? null extends T[K]
      ? { id: I } | null
      : { id: I }
    : T[K];
};

/**
 * Interface para operações de persistência baseadas em dados de domínio
 *
 * @template DomainData - Tipo da interface de domínio (ex: IAmbiente, ICampus)
 */
export interface IPersistRepositoryPort<DomainData> {
  /**
   * Cria uma nova entidade a partir de dados de domínio
   */
  createFromDomain(data: Partial<PersistInput<DomainData>>): Promise<{ id: string | number }>;

  /**
   * Atualiza uma entidade existente a partir de dados parciais de domínio
   */
  updateFromDomain(id: string | number, data: Partial<PersistInput<DomainData>>): Promise<void>;
}
