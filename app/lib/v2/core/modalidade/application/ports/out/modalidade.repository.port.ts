import type { DeepPartial } from "typeorm";
import type { AccessContext } from "@/infrastructure/access-context";
import type {
  ModalidadeFindOneInputDto,
  ModalidadeFindOneOutputDto,
  ModalidadeListInputDto,
  ModalidadeListOutputDto,
} from "@/v2/adapters/in/http/modalidade/dto";
import type { ModalidadeEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";

/**
 * Port de saída para operações de persistência de Modalidade
 * Define o contrato que os adapters de persistência devem implementar
 */
export interface IModalidadeRepositoryPort {
  /**
   * Lista modalidades com paginação
   * @param accessContext Contexto de acesso para aplicar filtros de permissão
   * @param dto DTO com critérios de busca e paginação
   * @param selection Campos a serem selecionados (GraphQL/otimização)
   * @returns Lista paginada de modalidades
   */
  findAll(
    accessContext: AccessContext,
    dto: ModalidadeListInputDto | null,
    selection?: string[],
  ): Promise<ModalidadeListOutputDto>;

  /**
   * Busca uma modalidade por ID
   * @param accessContext Contexto de acesso para aplicar filtros de permissão (pode ser null)
   * @param dto DTO com ID da modalidade
   * @param selection Campos a serem selecionados
   * @returns Modalidade encontrada ou null
   */
  findById(
    accessContext: AccessContext | null,
    dto: ModalidadeFindOneInputDto,
    selection?: string[],
  ): Promise<ModalidadeFindOneOutputDto | null>;

  /**
   * Busca uma modalidade por ID (formato simples)
   * @param accessContext Contexto de acesso para aplicar filtros de permissão
   * @param id ID da modalidade
   * @param selection Campos a serem selecionados
   * @returns Modalidade encontrada ou null
   */
  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<ModalidadeFindOneOutputDto | null>;

  /**
   * Salva (cria ou atualiza) uma modalidade
   * @param modalidade Dados parciais da modalidade a ser salva
   * @returns Modalidade salva
   */
  save(modalidade: DeepPartial<ModalidadeEntity>): Promise<ModalidadeEntity>;

  /**
   * Cria uma nova entidade modalidade
   * @returns Nova instância de ModalidadeEntity
   */
  create(): ModalidadeEntity;

  /**
   * Mescla dados parciais em uma modalidade existente
   * @param modalidade Modalidade base
   * @param data Dados a serem mesclados
   */
  merge(modalidade: ModalidadeEntity, data: DeepPartial<ModalidadeEntity>): void;

  /**
   * Soft delete de uma modalidade por ID
   * @param id ID da modalidade
   */
  softDeleteById(id: string): Promise<void>;
}
