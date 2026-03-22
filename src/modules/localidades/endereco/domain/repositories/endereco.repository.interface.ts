import type {
  IRepositoryCreate,
  IRepositoryFindAll,
  IRepositoryFindById,
  IRepositorySoftDelete,
  IRepositoryUpdate,
} from "@/domain/abstractions";
import type {
  EnderecoFindOneQueryResult,
  EnderecoListQueryResult,
  IEndereco,
} from "@/modules/localidades/endereco";

export const IEnderecoRepository = Symbol("IEnderecoRepository");

/**
 * Port de saída para operações de persistência de Endereco
 * Estende a interface base de CRUD com operações padrão
 */
export type IEnderecoRepository = IRepositoryFindAll<EnderecoListQueryResult> &
  IRepositoryFindById<EnderecoFindOneQueryResult> &
  IRepositoryCreate<IEndereco> &
  IRepositoryUpdate<IEndereco> &
  IRepositorySoftDelete & {
    /**
     * Busca um endereço por ID (versão simplificada sem contexto de acesso)
     */
    findOneById(id: string): Promise<EnderecoFindOneQueryResult | null>;

    /**
     * Verifica se um endereço existe
     */
    exists(id: string): Promise<boolean>;
  };
