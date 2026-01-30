import type { DeepPartial } from "typeorm";
import type {
  CursoFindOneInputDto,
  CursoFindOneOutputDto,
  CursoListInputDto,
  CursoListOutputDto,
} from "@/server/nest/modules/curso/rest";
import type { CursoEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";

/**
 * Token de injecao para o repositorio de Curso
 */
export const CURSO_REPOSITORY_PORT = Symbol("ICursoRepositoryPort");

/**
 * Port de saida para operacoes de persistencia de Curso
 * Define o contrato que os adapters de persistencia devem implementar
 */
export interface ICursoRepositoryPort {
  /**
   * Lista cursos com paginacao
   * @param accessContext Contexto de acesso para aplicar filtros de permissao
   * @param dto DTO com criterios de busca e paginacao
   * @param selection Campos a serem selecionados (GraphQL/otimizacao)
   * @returns Lista paginada de cursos
   */
  findAll(
    accessContext: AccessContext,
    dto: CursoListInputDto | null,
    selection?: string[] | boolean,
  ): Promise<CursoListOutputDto>;

  /**
   * Busca um curso por ID
   * @param accessContext Contexto de acesso para aplicar filtros de permissao (pode ser null)
   * @param dto DTO com ID do curso
   * @param selection Campos a serem selecionados
   * @returns Curso encontrado ou null
   */
  findById(
    accessContext: AccessContext | null,
    dto: CursoFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<CursoFindOneOutputDto | null>;

  /**
   * Busca um curso por ID (formato simples)
   * @param accessContext Contexto de acesso para aplicar filtros de permissao
   * @param id ID do curso
   * @param selection Campos a serem selecionados
   * @returns Curso encontrado ou null
   */
  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<CursoFindOneOutputDto | null>;

  /**
   * Salva (cria ou atualiza) um curso
   * @param curso Dados parciais do curso a ser salvo
   * @returns Curso salvo
   */
  save(curso: DeepPartial<CursoEntity>): Promise<CursoEntity>;

  /**
   * Cria uma nova entidade curso
   * @returns Nova instancia de CursoEntity
   */
  create(): CursoEntity;

  /**
   * Mescla dados parciais em um curso existente
   * @param curso Curso base
   * @param data Dados a serem mesclados
   */
  merge(curso: CursoEntity, data: DeepPartial<CursoEntity>): void;

  /**
   * Soft delete de um curso por ID
   * @param id ID do curso
   */
  softDeleteById(id: string): Promise<void>;
}
