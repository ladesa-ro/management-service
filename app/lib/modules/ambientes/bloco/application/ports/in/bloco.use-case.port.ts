import type { StreamableFile } from "@nestjs/common";
import type { AccessContext } from "@/modules/@core/access-context";
import type {
  BlocoCreateInputDto,
  BlocoFindOneInputDto,
  BlocoFindOneOutputDto,
  BlocoListInputDto,
  BlocoListOutputDto,
  BlocoUpdateInputDto,
} from "../../dtos";

/**
 * Port de entrada para casos de uso de Bloco
 * Define o contrato que o service deve implementar
 */
export interface IBlocoUseCasePort {
  /**
   * Lista blocos com paginacao
   */
  findAll(
    accessContext: AccessContext,
    dto: BlocoListInputDto,
    selection?: string[] | boolean,
  ): Promise<BlocoListOutputDto>;

  /**
   * Busca um bloco por ID
   */
  findById(
    accessContext: AccessContext | null,
    dto: BlocoFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<BlocoFindOneOutputDto | null>;

  /**
   * Busca um bloco por ID (lanca excecao se nao encontrado)
   */
  findByIdStrict(
    accessContext: AccessContext | null,
    dto: BlocoFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<BlocoFindOneOutputDto>;

  /**
   * Busca um bloco por ID (formato simples)
   */
  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<BlocoFindOneOutputDto | null>;

  /**
   * Busca um bloco por ID (formato simples, lanca excecao se nao encontrado)
   */
  findByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<BlocoFindOneOutputDto>;

  /**
   * Obtem a imagem de capa do bloco
   */
  getImagemCapa(accessContext: AccessContext | null, id: string): Promise<StreamableFile>;

  /**
   * Atualiza a imagem de capa do bloco
   */
  updateImagemCapa(
    accessContext: AccessContext,
    dto: BlocoFindOneInputDto,
    file: Express.Multer.File,
  ): Promise<boolean>;

  /**
   * Cria um novo bloco
   */
  create(accessContext: AccessContext, dto: BlocoCreateInputDto): Promise<BlocoFindOneOutputDto>;

  /**
   * Atualiza um bloco existente
   */
  update(
    accessContext: AccessContext,
    dto: BlocoFindOneInputDto & BlocoUpdateInputDto,
  ): Promise<BlocoFindOneOutputDto>;

  /**
   * Remove um bloco (soft delete)
   */
  deleteOneById(accessContext: AccessContext, dto: BlocoFindOneInputDto): Promise<boolean>;
}
