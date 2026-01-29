import type { StreamableFile } from "@nestjs/common";
import type { AccessContext } from "@/old/infrastructure/access-context";
import type {
  BlocoCreateInputDto,
  BlocoFindOneInputDto,
  BlocoFindOneOutputDto,
  BlocoListInputDto,
  BlocoListOutputDto,
  BlocoUpdateInputDto,
} from "@/v2/server/modules/bloco/http/dto";

/**
 * Port de entrada para casos de uso de Bloco
 * Define o contrato que o service deve implementar
 */
export interface IBlocoUseCasePort {
  /**
   * Lista blocos com paginação
   */
  blocoFindAll(
    accessContext: AccessContext,
    dto: BlocoListInputDto,
    selection?: string[] | boolean,
  ): Promise<BlocoListOutputDto>;

  /**
   * Busca um bloco por ID
   */
  blocoFindById(
    accessContext: AccessContext | null,
    dto: BlocoFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<BlocoFindOneOutputDto | null>;

  /**
   * Busca um bloco por ID (lança exceção se não encontrado)
   */
  blocoFindByIdStrict(
    accessContext: AccessContext | null,
    dto: BlocoFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<BlocoFindOneOutputDto>;

  /**
   * Busca um bloco por ID (formato simples)
   */
  blocoFindByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<BlocoFindOneOutputDto | null>;

  /**
   * Busca um bloco por ID (formato simples, lança exceção se não encontrado)
   */
  blocoFindByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<BlocoFindOneOutputDto>;

  /**
   * Obtém a imagem de capa do bloco
   */
  blocoGetImagemCapa(accessContext: AccessContext | null, id: string): Promise<StreamableFile>;

  /**
   * Atualiza a imagem de capa do bloco
   */
  blocoUpdateImagemCapa(
    accessContext: AccessContext,
    dto: BlocoFindOneInputDto,
    file: Express.Multer.File,
  ): Promise<boolean>;

  /**
   * Cria um novo bloco
   */
  blocoCreate(
    accessContext: AccessContext,
    dto: BlocoCreateInputDto,
  ): Promise<BlocoFindOneOutputDto>;

  /**
   * Atualiza um bloco existente
   */
  blocoUpdate(
    accessContext: AccessContext,
    dto: BlocoFindOneInputDto & BlocoUpdateInputDto,
  ): Promise<BlocoFindOneOutputDto>;

  /**
   * Remove um bloco (soft delete)
   */
  blocoDeleteOneById(accessContext: AccessContext, dto: BlocoFindOneInputDto): Promise<boolean>;
}
