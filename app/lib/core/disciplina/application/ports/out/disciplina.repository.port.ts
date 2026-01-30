import type { DeepPartial } from "typeorm";
import type { DisciplinaEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import type {
  DisciplinaFindOneInputDto,
  DisciplinaFindOneOutputDto,
  DisciplinaListInputDto,
  DisciplinaListOutputDto,
} from "@/v2/server/modules/disciplina/http/dto";

/**
 * Token de injeção para o repositório de Disciplina
 */
export const DISCIPLINA_REPOSITORY_PORT = Symbol("IDisciplinaRepositoryPort");

/**
 * Port de saída para operações de persistência de Disciplina
 * Define o contrato que os adapters de persistência devem implementar
 */
export interface IDisciplinaRepositoryPort {
  /**
   * Lista disciplinas com paginação
   * @param accessContext Contexto de acesso para aplicar filtros de permissão
   * @param dto DTO com critérios de busca e paginação
   * @param selection Campos a serem selecionados
   * @returns Lista paginada de disciplinas
   */
  findAll(
    accessContext: AccessContext,
    dto: DisciplinaListInputDto | null,
    selection?: string[] | boolean,
  ): Promise<DisciplinaListOutputDto>;

  /**
   * Busca uma disciplina por ID
   * @param accessContext Contexto de acesso para aplicar filtros de permissão
   * @param dto DTO com ID da disciplina
   * @param selection Campos a serem selecionados
   * @returns Disciplina encontrada ou null
   */
  findById(
    accessContext: AccessContext | null,
    dto: DisciplinaFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<DisciplinaFindOneOutputDto | null>;

  /**
   * Busca uma disciplina por ID (simplificado)
   * @param accessContext Contexto de acesso
   * @param id ID da disciplina
   * @param selection Campos a serem selecionados
   * @returns Disciplina encontrada ou null
   */
  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<DisciplinaFindOneOutputDto | null>;

  /**
   * Salva uma disciplina
   * @param disciplina Dados da disciplina a salvar
   * @returns Entidade salva
   */
  save(disciplina: DeepPartial<DisciplinaEntity>): Promise<DisciplinaEntity>;

  /**
   * Cria uma nova entidade de disciplina
   * @returns Nova entidade
   */
  create(): DisciplinaEntity;

  /**
   * Mescla dados em uma entidade existente
   * @param disciplina Entidade existente
   * @param data Dados a mesclar
   */
  merge(disciplina: DisciplinaEntity, data: DeepPartial<DisciplinaEntity>): void;

  /**
   * Remove uma disciplina por ID (soft delete)
   * @param id ID da disciplina
   */
  softDeleteById(id: string): Promise<void>;
}
