import type { IBaseCrudRepositoryPort } from "@/Ladesa.Management.Application/@shared";
import type {
  Endereco,
  EnderecoFindOneOutputDto,
  EnderecoListOutputDto,
} from "@/Ladesa.Management.Application/localidades/endereco";

export const IEnderecoRepository = Symbol("IEnderecoRepository");

/**
 * Port de saída para operações de persistência de Endereco
 * Estende a interface base de CRUD com operações padrão
 */
export interface IEnderecoRepository
  extends IBaseCrudRepositoryPort<Endereco, EnderecoListOutputDto, EnderecoFindOneOutputDto> {
  /**
   * Busca um endereço por ID (versão simplificada sem contexto de acesso)
   */
  findOneById(id: string): Promise<EnderecoFindOneOutputDto | null>;

  /**
   * Verifica se um endereço existe
   */
  exists(id: string): Promise<boolean>;
}
