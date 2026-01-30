import type { StreamableFile } from "@nestjs/common";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import type {
  DisciplinaCreateInputDto,
  DisciplinaFindOneInputDto,
  DisciplinaFindOneOutputDto,
  DisciplinaListInputDto,
  DisciplinaListOutputDto,
  DisciplinaUpdateInputDto,
} from "@/v2/server/modules/disciplina/http/dto";

/**
 * Port de entrada para casos de uso de Disciplina
 * Define o contrato que o service deve implementar
 */
export interface IDisciplinaUseCasePort {
  /**
   * Lista disciplinas com paginação
   * @param accessContext Contexto de acesso para aplicar filtros de permissão
   * @param dto DTO com critérios de busca e paginação
   * @param selection Campos a serem selecionados
   * @returns Lista paginada de disciplinas
   */
  disciplinaFindAll(
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
  disciplinaFindById(
    accessContext: AccessContext | null,
    dto: DisciplinaFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<DisciplinaFindOneOutputDto | null>;

  /**
   * Busca uma disciplina por ID (lança exceção se não encontrada)
   * @param accessContext Contexto de acesso para aplicar filtros de permissão
   * @param dto DTO com ID da disciplina
   * @param selection Campos a serem selecionados
   * @returns Disciplina encontrada
   */
  disciplinaFindByIdStrict(
    accessContext: AccessContext | null,
    dto: DisciplinaFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<DisciplinaFindOneOutputDto>;

  /**
   * Busca uma disciplina por ID (simplificado)
   * @param accessContext Contexto de acesso
   * @param id ID da disciplina
   * @param selection Campos a serem selecionados
   * @returns Disciplina encontrada ou null
   */
  disciplinaFindByIdSimple(
    accessContext: AccessContext,
    id: DisciplinaFindOneInputDto["id"],
    selection?: string[] | boolean,
  ): Promise<DisciplinaFindOneOutputDto | null>;

  /**
   * Busca uma disciplina por ID (simplificado, lança exceção se não encontrada)
   * @param accessContext Contexto de acesso
   * @param id ID da disciplina
   * @param selection Campos a serem selecionados
   * @returns Disciplina encontrada
   */
  disciplinaFindByIdSimpleStrict(
    accessContext: AccessContext,
    id: DisciplinaFindOneInputDto["id"],
    selection?: string[],
  ): Promise<DisciplinaFindOneOutputDto>;

  /**
   * Cria uma nova disciplina
   * @param accessContext Contexto de acesso
   * @param dto Dados da disciplina a criar
   * @returns Disciplina criada
   */
  disciplinaCreate(
    accessContext: AccessContext,
    dto: DisciplinaCreateInputDto,
  ): Promise<DisciplinaFindOneOutputDto>;

  /**
   * Atualiza uma disciplina existente
   * @param accessContext Contexto de acesso
   * @param dto Dados da disciplina a atualizar
   * @returns Disciplina atualizada
   */
  disciplinaUpdate(
    accessContext: AccessContext,
    dto: DisciplinaFindOneInputDto & DisciplinaUpdateInputDto,
  ): Promise<DisciplinaFindOneOutputDto>;

  /**
   * Busca a imagem de capa de uma disciplina
   * @param accessContext Contexto de acesso
   * @param id ID da disciplina
   * @returns Arquivo de imagem
   */
  disciplinaGetImagemCapa(accessContext: AccessContext | null, id: string): Promise<StreamableFile>;

  /**
   * Atualiza a imagem de capa de uma disciplina
   * @param accessContext Contexto de acesso
   * @param dto DTO com ID da disciplina
   * @param file Arquivo de imagem
   * @returns true se atualizado com sucesso
   */
  disciplinaUpdateImagemCapa(
    accessContext: AccessContext,
    dto: DisciplinaFindOneInputDto,
    file: Express.Multer.File,
  ): Promise<boolean>;

  /**
   * Remove uma disciplina por ID (soft delete)
   * @param accessContext Contexto de acesso
   * @param dto DTO com ID da disciplina
   * @returns true se removido com sucesso
   */
  disciplinaDeleteOneById(
    accessContext: AccessContext,
    dto: DisciplinaFindOneInputDto,
  ): Promise<boolean>;
}
