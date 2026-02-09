import type { IBaseCrudRepositoryPort, PartialEntity } from "@/modules/@shared";
import type {
  EnderecoFindOneOutputDto,
  EnderecoInputDto,
  EnderecoListOutputDto,
} from "@/modules/endereco";
import type { EnderecoEntity } from "@/modules/endereco/infrastructure/persistence/typeorm";

export const ENDERECO_REPOSITORY_PORT = Symbol("IEnderecoRepositoryPort");

/**
 * Port de saída para operações de persistência de Endereco
 * Estende a interface base de CRUD com operações padrão
 */
export interface IEnderecoRepositoryPort
  extends IBaseCrudRepositoryPort<EnderecoEntity, EnderecoListOutputDto, EnderecoFindOneOutputDto> {
  /**
   * Busca um endereço por ID (versão simplificada sem contexto de acesso)
   */
  findOneById(id: string): Promise<EnderecoFindOneOutputDto | null>;

  /**
   * Verifica se um endereço existe
   */
  exists(id: string): Promise<boolean>;

  /**
   * Mescla dados em uma entidade existente (sobrescreve para aceitar EnderecoInputDto)
   */
  merge(entity: EnderecoEntity, data: EnderecoInputDto | PartialEntity<EnderecoEntity>): void;
}
