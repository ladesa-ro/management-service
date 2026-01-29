import type { DeepPartial } from "typeorm";
import type { AccessContext } from "@/old/infrastructure/access-context";
import type {
  EnderecoFindOneInputDto,
  EnderecoFindOneOutputDto,
  EnderecoInputDto,
} from "@/v2/server/modules/endereco/http/dto";
import type { EnderecoEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";

/**
 * Port de saída para operações de persistência de Endereco
 * Define o contrato que os adapters de persistência devem implementar
 */
export interface IEnderecoRepositoryPort {
  /**
   * Busca um endereço por ID (sem filtro de acesso)
   * @param id ID do endereço
   * @returns Endereço encontrado ou null
   */
  findOneById(id: string): Promise<EnderecoFindOneOutputDto | null>;

  /**
   * Busca um endereço por ID com contexto de acesso
   * @param accessContext Contexto de acesso para aplicar filtros de permissão
   * @param dto DTO com ID do endereço
   * @param selection Campos a serem selecionados
   * @returns Endereço encontrado ou null
   */
  findById(
    accessContext: AccessContext,
    dto: EnderecoFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<EnderecoFindOneOutputDto | null>;

  /**
   * Verifica se um endereço existe
   * @param id ID do endereço
   * @returns true se existe, false caso contrário
   */
  exists(id: string): Promise<boolean>;

  /**
   * Salva (cria ou atualiza) um endereço
   * @param endereco Dados parciais do endereço a ser salvo
   * @returns Endereço salvo
   */
  save(endereco: DeepPartial<EnderecoEntity>): Promise<EnderecoEntity>;

  /**
   * Cria uma nova entidade endereço
   * @returns Nova instância de EnderecoEntity
   */
  create(): EnderecoEntity;

  /**
   * Mescla dados parciais em um endereço existente
   * @param endereco Endereço base
   * @param data Dados a serem mesclados
   */
  merge(endereco: EnderecoEntity, data: EnderecoInputDto): void;
}
