import type { StreamableFile } from "@nestjs/common";
import type { AccessContext } from "@/modules/@core/contexto-acesso";
import type {
  AmbienteCreateInputDto,
  AmbienteFindOneInputDto,
  AmbienteFindOneOutputDto,
  AmbienteListInputDto,
  AmbienteListOutputDto,
  AmbienteUpdateInputDto,
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
    dto: AmbienteListInputDto | null,
    selection?: string[] | boolean,
  ): Promise<AmbienteListOutputDto>;

  /**
   * Busca um ambiente por ID
   */
  findById(
    accessContext: AccessContext | null,
    dto: AmbienteFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<AmbienteFindOneOutputDto | null>;

  /**
   * Busca um ambiente por ID (lança exceção se não encontrado)
   */
  findByIdStrict(
    accessContext: AccessContext | null,
    dto: AmbienteFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<AmbienteFindOneOutputDto>;

  /**
   * Cria um novo ambiente
   */
  create(
    accessContext: AccessContext,
    dto: AmbienteCreateInputDto,
  ): Promise<AmbienteFindOneOutputDto>;

  /**
   * Atualiza um ambiente existente
   */
  update(
    accessContext: AccessContext,
    dto: AmbienteFindOneInputDto & AmbienteUpdateInputDto,
  ): Promise<AmbienteFindOneOutputDto>;

  /**
   * Obtém a imagem de capa do ambiente
   */
  getImagemCapa(accessContext: AccessContext | null, id: string): Promise<StreamableFile>;

  /**
   * Atualiza a imagem de capa do ambiente
   */
  updateImagemCapa(
    accessContext: AccessContext,
    dto: AmbienteFindOneInputDto,
    file: Express.Multer.File,
  ): Promise<boolean>;

  /**
   * Remove um ambiente (soft delete)
   */
  deleteOneById(accessContext: AccessContext, dto: AmbienteFindOneInputDto): Promise<boolean>;
}
