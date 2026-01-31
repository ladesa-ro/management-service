import type { IBaseCrudRepositoryPort, PartialEntity } from "@/core/@shared";
import type { EnderecoFindOneOutput, EnderecoInputDto, EnderecoListOutput } from "@/core/endereco";
import type { EnderecoEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";

export const ENDERECO_REPOSITORY_PORT = Symbol("IEnderecoRepositoryPort");

/**
 * Port de saída para operações de persistência de Endereco
 * Estende a interface base de CRUD com operações padrão
 */
export interface IEnderecoRepositoryPort
  extends IBaseCrudRepositoryPort<EnderecoEntity, EnderecoListOutput, EnderecoFindOneOutput> {
  /**
   * Busca um endereço por ID (versão simplificada sem contexto de acesso)
   */
  findOneById(id: string): Promise<EnderecoFindOneOutput | null>;

  /**
   * Verifica se um endereço existe
   */
  exists(id: string): Promise<boolean>;

  /**
   * Mescla dados em uma entidade existente (sobrescreve para aceitar EnderecoInputDto)
   */
  merge(entity: EnderecoEntity, data: EnderecoInputDto | PartialEntity<EnderecoEntity>): void;
}
