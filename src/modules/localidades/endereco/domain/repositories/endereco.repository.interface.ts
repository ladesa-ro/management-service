import type { IBaseCrudRepositoryPort } from "@/modules/@shared";
import type {
  EnderecoFindOneOutputDto,
  EnderecoListOutputDto,
  IEndereco,
} from "@/modules/localidades/endereco";

export const ENDERECO_REPOSITORY_PORT = Symbol("IEnderecoRepositoryPort");

/**
 * Port de saída para operações de persistência de Endereco
 * Estende a interface base de CRUD com operações padrão
 */
export interface IEnderecoRepositoryPort
  extends IBaseCrudRepositoryPort<IEndereco, EnderecoListOutputDto, EnderecoFindOneOutputDto> {
  /**
   * Busca um endereço por ID (versão simplificada sem contexto de acesso)
   */
  findOneById(id: string): Promise<EnderecoFindOneOutputDto | null>;

  /**
   * Verifica se um endereço existe
   */
  exists(id: string): Promise<boolean>;
}
