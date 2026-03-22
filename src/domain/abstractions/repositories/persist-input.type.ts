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
 * interface IAmbiente extends IEntityBaseUuid {
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
