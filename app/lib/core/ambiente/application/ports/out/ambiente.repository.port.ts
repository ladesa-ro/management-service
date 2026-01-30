import type { DeepPartial } from "typeorm";
import type { AmbienteEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import type {
  AmbienteFindOneInput,
  AmbienteFindOneOutput,
  AmbienteListInput,
  AmbienteListOutput,
} from "../../dtos";

/**
 * Token de injeção para o repositório de Ambiente
 */
export const AMBIENTE_REPOSITORY_PORT = Symbol("IAmbienteRepositoryPort");

/**
 * Port de saída para operações de persistência de Ambiente
 * Define o contrato que os adapters de persistência devem implementar
 */
export interface IAmbienteRepositoryPort {
  /**
   * Lista ambientes com paginação
   * @param accessContext Contexto de acesso para aplicar filtros de permissão
   * @param dto DTO com critérios de busca e paginação
   * @param selection Campos a serem selecionados (GraphQL/otimização)
   * @returns Lista paginada de ambientes
   */
  findAll(
    accessContext: AccessContext,
    dto: AmbienteListInput | null,
    selection?: string[] | boolean,
  ): Promise<AmbienteListOutput>;

  /**
   * Busca um ambiente por ID
   * @param accessContext Contexto de acesso para aplicar filtros de permissão (pode ser null)
   * @param dto DTO com ID do ambiente
   * @param selection Campos a serem selecionados
   * @returns Ambiente encontrado ou null
   */
  findById(
    accessContext: AccessContext | null,
    dto: AmbienteFindOneInput,
    selection?: string[] | boolean,
  ): Promise<AmbienteFindOneOutput | null>;

  /**
   * Salva (cria ou atualiza) um ambiente
   * @param ambiente Dados parciais do ambiente a ser salvo
   * @returns Ambiente salvo
   */
  save(ambiente: DeepPartial<AmbienteEntity>): Promise<AmbienteEntity>;

  /**
   * Cria uma nova entidade ambiente
   * @returns Nova instância de AmbienteEntity
   */
  create(): AmbienteEntity;

  /**
   * Mescla dados parciais em um ambiente existente
   * @param ambiente Ambiente base
   * @param data Dados a serem mesclados
   */
  merge(ambiente: AmbienteEntity, data: DeepPartial<AmbienteEntity>): void;

  /**
   * Soft delete de um ambiente por ID
   * @param id ID do ambiente
   */
  softDeleteById(id: string): Promise<void>;
}
