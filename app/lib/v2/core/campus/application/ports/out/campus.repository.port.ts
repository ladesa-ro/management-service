import type { DeepPartial } from "typeorm";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import type {
  CampusFindOneInputDto,
  CampusFindOneOutputDto,
  CampusListInputDto,
  CampusListOutputDto,
} from "@/v2/server/modules/campus/http/dto";
import type { CampusEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";

/**
 * Port de saída para operações de persistência de Campus
 * Define o contrato que os adapters de persistência devem implementar
 */
export interface ICampusRepositoryPort {
  /**
   * Lista campus com paginação
   * @param accessContext Contexto de acesso para aplicar filtros de permissão
   * @param dto DTO com critérios de busca e paginação
   * @param selection Campos a serem selecionados (GraphQL/otimização)
   * @returns Lista paginada de campus
   */
  findAll(
    accessContext: AccessContext,
    dto: CampusListInputDto | null,
    selection?: string[] | boolean,
  ): Promise<CampusListOutputDto>;

  /**
   * Busca um campus por ID
   * @param accessContext Contexto de acesso para aplicar filtros de permissão
   * @param dto DTO com ID do campus
   * @param selection Campos a serem selecionados
   * @returns Campus encontrado ou null
   */
  findById(
    accessContext: AccessContext,
    dto: CampusFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<CampusFindOneOutputDto | null>;

  /**
   * Busca um campus por ID (formato simples)
   * @param accessContext Contexto de acesso para aplicar filtros de permissão
   * @param id ID do campus
   * @param selection Campos a serem selecionados
   * @returns Campus encontrado ou null
   */
  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<CampusFindOneOutputDto | null>;

  /**
   * Salva (cria ou atualiza) um campus
   * @param campus Dados parciais do campus a ser salvo
   * @returns Campus salvo
   */
  save(campus: DeepPartial<CampusEntity>): Promise<CampusEntity>;

  /**
   * Cria uma nova entidade campus
   * @returns Nova instância de CampusEntity
   */
  create(): CampusEntity;

  /**
   * Mescla dados parciais em um campus existente
   * @param campus Campus base
   * @param data Dados a serem mesclados
   */
  merge(campus: CampusEntity, data: DeepPartial<CampusEntity>): void;

  /**
   * Soft delete de um campus por ID
   * @param id ID do campus
   */
  softDeleteById(id: string): Promise<void>;
}
