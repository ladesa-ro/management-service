import type { StreamableFile } from "@nestjs/common";
import type { AccessContext } from "@/old/infrastructure/access-context";
import type {
  CursoCreateInputDto,
  CursoFindOneInputDto,
  CursoFindOneOutputDto,
  CursoListInputDto,
  CursoListOutputDto,
  CursoUpdateInputDto,
} from "@/v2/server/modules/curso/http/dto";

/**
 * Port de entrada para casos de uso de Curso
 * Define o contrato que o service deve implementar
 */
export interface ICursoUseCasePort {
  /**
   * Lista cursos com paginação
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
   * Busca um curso por ID (lança exceção se não encontrado)
   */
  cursoFindByIdStrict(
    accessContext: AccessContext | null,
    dto: CursoFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<CursoFindOneOutputDto>;

  /**
   * Busca um curso por ID com seleção simplificada
   */
  cursoFindByIdSimple(
    accessContext: AccessContext,
    id: CursoFindOneInputDto["id"],
    selection?: string[],
  ): Promise<CursoFindOneOutputDto | null>;

  /**
   * Busca um curso por ID com seleção simplificada (lança exceção se não encontrado)
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
   * Obtém a imagem de capa do curso
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
