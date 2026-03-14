import type { IBaseCrudRepository } from "@/modules/@shared";
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
export interface IEnderecoRepository
  extends IBaseCrudRepository<IEndereco, EnderecoListQueryResult, EnderecoFindOneQueryResult> {
  /**
   * Busca um endereço por ID (versão simplificada sem contexto de acesso)
   */
  findOneById(id: string): Promise<EnderecoFindOneQueryResult | null>;

  /**
   * Verifica se um endereço existe
   */
  exists(id: string): Promise<boolean>;
}
