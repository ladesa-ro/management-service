import type {
  IRepositoryGetFindAllQueryResult,
  IRepositoryGetFindOneQueryResult,
  IRepositorySoftDeleteById,
  PersistInput,
} from "@/domain/abstractions";
import type {
  EnderecoFindOneQuery,
  EnderecoFindOneQueryResult,
  EnderecoListQuery,
  EnderecoListQueryResult,
  IEndereco,
} from "@/modules/localidades/endereco";

export const IEnderecoRepository = Symbol("IEnderecoRepository");

/**
 * Port de saída para operações de persistência de Endereco.
 */

export interface IEnderecoRepository {
  // ==========================================
  // Write side — usado por command handlers
  // ==========================================

  /** Cria o registro e retorna o ID gerado. */
  create(data: Partial<PersistInput<IEndereco>>): Promise<{ id: string | number }>;

  /** Atualiza campos do registro por ID. */
  update(id: string | number, data: Partial<PersistInput<IEndereco>>): Promise<void>;

  /** Soft-delete por ID. */
  softDeleteById: IRepositorySoftDeleteById;

  /** Busca um endereço por ID sem contexto de acesso (uso interno em command handlers). */
  findOneById(id: string): Promise<EnderecoFindOneQueryResult | null>;

  /** Verifica se um endereço existe. */
  exists(id: string): Promise<boolean>;

  // ==========================================
  // Read side — usado por query handlers
  // ==========================================

  /** Retorna um registro hidratado com todas as relações para exibição. */
  getFindOneQueryResult: IRepositoryGetFindOneQueryResult<
    EnderecoFindOneQuery,
    EnderecoFindOneQueryResult
  >;

  /** Retorna lista paginada com dados hidratados para exibição. */
  getFindAllQueryResult: IRepositoryGetFindAllQueryResult<
    EnderecoListQuery,
    EnderecoListQueryResult
  >;
}
