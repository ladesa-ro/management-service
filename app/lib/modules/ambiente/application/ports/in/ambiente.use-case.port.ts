import type { StreamableFile } from "@nestjs/common";
import type { AccessContext } from "@/modules/@core/access-context";
import type {
  AmbienteCreateInput,
  AmbienteFindOneInput,
  AmbienteFindOneOutput,
  AmbienteListInput,
  AmbienteListOutput,
  AmbienteUpdateInput,
} from "../../dtos";

/**
 * Port de entrada para casos de uso de Ambiente
 * Define o contrato que o service deve implementar
 */
export interface IAmbienteUseCasePort {
  /**
   * Lista ambientes com paginação
   */
  findAll(
    accessContext: AccessContext,
    dto: AmbienteListInput | null,
    selection?: string[] | boolean,
  ): Promise<AmbienteListOutput>;

  /**
   * Busca um ambiente por ID
   */
  findById(
    accessContext: AccessContext | null,
    dto: AmbienteFindOneInput,
    selection?: string[] | boolean,
  ): Promise<AmbienteFindOneOutput | null>;

  /**
   * Busca um ambiente por ID (lança exceção se não encontrado)
   */
  findByIdStrict(
    accessContext: AccessContext | null,
    dto: AmbienteFindOneInput,
    selection?: string[] | boolean,
  ): Promise<AmbienteFindOneOutput>;

  /**
   * Cria um novo ambiente
   */
  create(accessContext: AccessContext, dto: AmbienteCreateInput): Promise<AmbienteFindOneOutput>;

  /**
   * Atualiza um ambiente existente
   */
  update(
    accessContext: AccessContext,
    dto: AmbienteFindOneInput & AmbienteUpdateInput,
  ): Promise<AmbienteFindOneOutput>;

  /**
   * Obtém a imagem de capa do ambiente
   */
  getImagemCapa(accessContext: AccessContext | null, id: string): Promise<StreamableFile>;

  /**
   * Atualiza a imagem de capa do ambiente
   */
  updateImagemCapa(
    accessContext: AccessContext,
    dto: AmbienteFindOneInput,
    file: Express.Multer.File,
  ): Promise<boolean>;

  /**
   * Remove um ambiente (soft delete)
   */
  deleteOneById(accessContext: AccessContext, dto: AmbienteFindOneInput): Promise<boolean>;
}
