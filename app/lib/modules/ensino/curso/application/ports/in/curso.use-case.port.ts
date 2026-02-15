import type { StreamableFile } from "@nestjs/common";
import type { AccessContext } from "@/modules/@core/access-context";
import type {
  CursoCreateInputDto,
  CursoFindOneInputDto,
  CursoFindOneOutputDto,
  CursoListInputDto,
  CursoListOutputDto,
  CursoUpdateInputDto,
} from "../../dtos";

/**
 * Port de entrada para casos de uso de Curso
 * Define o contrato que o service deve implementar
 */
export interface ICursoUseCasePort {
  /**
   * Lista cursos com paginacao
   */
  findAll(
    accessContext: AccessContext,
    dto: CursoListInputDto | null,
    selection?: string[] | boolean,
  ): Promise<CursoListOutputDto>;

  /**
   * Busca um curso por ID
   */
  findById(
    accessContext: AccessContext | null,
    dto: CursoFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<CursoFindOneOutputDto | null>;

  /**
   * Busca um curso por ID (lanca excecao se nao encontrado)
   */
  findByIdStrict(
    accessContext: AccessContext | null,
    dto: CursoFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<CursoFindOneOutputDto>;

  /**
   * Busca um curso por ID com selecao simplificada
   */
  findByIdSimple(
    accessContext: AccessContext,
    id: CursoFindOneInputDto["id"],
    selection?: string[],
  ): Promise<CursoFindOneOutputDto | null>;

  /**
   * Busca um curso por ID com selecao simplificada (lanca excecao se nao encontrado)
   */
  findByIdSimpleStrict(
    accessContext: AccessContext,
    id: CursoFindOneInputDto["id"],
    selection?: string[],
  ): Promise<CursoFindOneOutputDto>;

  /**
   * Cria um novo curso
   */
  create(accessContext: AccessContext, dto: CursoCreateInputDto): Promise<CursoFindOneOutputDto>;

  /**
   * Atualiza um curso existente
   */
  update(
    accessContext: AccessContext,
    dto: CursoFindOneInputDto & CursoUpdateInputDto,
  ): Promise<CursoFindOneOutputDto>;

  /**
   * Obtem a imagem de capa do curso
   */
  getImagemCapa(accessContext: AccessContext | null, id: string): Promise<StreamableFile>;

  /**
   * Atualiza a imagem de capa do curso
   */
  updateImagemCapa(
    accessContext: AccessContext,
    dto: CursoFindOneInputDto,
    file: Express.Multer.File,
  ): Promise<boolean>;

  /**
   * Remove um curso (soft delete)
   */
  deleteOneById(accessContext: AccessContext, dto: CursoFindOneInputDto): Promise<boolean>;
}
