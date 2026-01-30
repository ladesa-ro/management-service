import type { StreamableFile } from "@nestjs/common";
import type {
  CursoCreateInputDto,
  CursoFindOneInputDto,
  CursoFindOneOutputDto,
  CursoListInputDto,
  CursoListOutputDto,
  CursoUpdateInputDto,
} from "@/server/nest/modules/curso/rest";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";

/**
 * Port de entrada para casos de uso de Curso
 * Define o contrato que o service deve implementar
 */
export interface ICursoUseCasePort {
  /**
   * Lista cursos com paginacao
   */
  cursoFindAll(
    accessContext: AccessContext,
    dto: CursoListInputDto | null,
    selection?: string[] | boolean,
  ): Promise<CursoListOutputDto>;

  /**
   * Busca um curso por ID
   */
  cursoFindById(
    accessContext: AccessContext | null,
    dto: CursoFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<CursoFindOneOutputDto | null>;

  /**
   * Busca um curso por ID (lanca excecao se nao encontrado)
   */
  cursoFindByIdStrict(
    accessContext: AccessContext | null,
    dto: CursoFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<CursoFindOneOutputDto>;

  /**
   * Busca um curso por ID com selecao simplificada
   */
  cursoFindByIdSimple(
    accessContext: AccessContext,
    id: CursoFindOneInputDto["id"],
    selection?: string[],
  ): Promise<CursoFindOneOutputDto | null>;

  /**
   * Busca um curso por ID com selecao simplificada (lanca excecao se nao encontrado)
   */
  cursoFindByIdSimpleStrict(
    accessContext: AccessContext,
    id: CursoFindOneInputDto["id"],
    selection?: string[],
  ): Promise<CursoFindOneOutputDto>;

  /**
   * Cria um novo curso
   */
  cursoCreate(
    accessContext: AccessContext,
    dto: CursoCreateInputDto,
  ): Promise<CursoFindOneOutputDto>;

  /**
   * Atualiza um curso existente
   */
  cursoUpdate(
    accessContext: AccessContext,
    dto: CursoFindOneInputDto & CursoUpdateInputDto,
  ): Promise<CursoFindOneOutputDto>;

  /**
   * Obtem a imagem de capa do curso
   */
  cursoGetImagemCapa(accessContext: AccessContext | null, id: string): Promise<StreamableFile>;

  /**
   * Atualiza a imagem de capa do curso
   */
  cursoUpdateImagemCapa(
    accessContext: AccessContext,
    dto: CursoFindOneInputDto,
    file: Express.Multer.File,
  ): Promise<boolean>;

  /**
   * Remove um curso (soft delete)
   */
  cursoDeleteOneById(accessContext: AccessContext, dto: CursoFindOneInputDto): Promise<boolean>;
}
