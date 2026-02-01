import type { StreamableFile } from "@nestjs/common";
import type { AccessContext } from "@/modules/@core/access-context";
import type {
  BlocoCreateInput,
  BlocoFindOneInput,
  BlocoFindOneOutput,
  BlocoListInput,
  BlocoListOutput,
  BlocoUpdateInput,
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
    dto: BlocoListInput,
    selection?: string[] | boolean,
  ): Promise<BlocoListOutput>;

  /**
   * Busca um bloco por ID
   */
  findById(
    accessContext: AccessContext | null,
    dto: BlocoFindOneInput,
    selection?: string[] | boolean,
  ): Promise<BlocoFindOneOutput | null>;

  /**
   * Busca um bloco por ID (lanca excecao se nao encontrado)
   */
  findByIdStrict(
    accessContext: AccessContext | null,
    dto: BlocoFindOneInput,
    selection?: string[] | boolean,
  ): Promise<BlocoFindOneOutput>;

  /**
   * Busca um bloco por ID (formato simples)
   */
  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<BlocoFindOneOutput | null>;

  /**
   * Busca um bloco por ID (formato simples, lanca excecao se nao encontrado)
   */
  findByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<BlocoFindOneOutput>;

  /**
   * Obtem a imagem de capa do bloco
   */
  getImagemCapa(accessContext: AccessContext | null, id: string): Promise<StreamableFile>;

  /**
   * Atualiza a imagem de capa do bloco
   */
  updateImagemCapa(
    accessContext: AccessContext,
    dto: BlocoFindOneInput,
    file: Express.Multer.File,
  ): Promise<boolean>;

  /**
   * Cria um novo bloco
   */
  create(accessContext: AccessContext, dto: BlocoCreateInput): Promise<BlocoFindOneOutput>;

  /**
   * Atualiza um bloco existente
   */
  update(
    accessContext: AccessContext,
    dto: BlocoFindOneInput & BlocoUpdateInput,
  ): Promise<BlocoFindOneOutput>;

  /**
   * Remove um bloco (soft delete)
   */
  deleteOneById(accessContext: AccessContext, dto: BlocoFindOneInput): Promise<boolean>;
}
