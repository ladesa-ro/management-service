import type { StreamableFile } from "@nestjs/common";
import type { AccessContext } from "@/infrastructure/access-context";
import type {
  AmbienteCreateInputDto,
  AmbienteFindOneInputDto,
  AmbienteFindOneOutputDto,
  AmbienteListInputDto,
  AmbienteListOutputDto,
  AmbienteUpdateInputDto,
} from "@/v2/server/modules/ambiente/http/dto";

/**
 * Port de entrada para casos de uso de Ambiente
 * Define o contrato que o service deve implementar
 */
export interface IAmbienteUseCasePort {
  /**
   * Lista ambientes com paginação
   */
  ambienteFindAll(
    accessContext: AccessContext,
    dto: AmbienteListInputDto | null,
    selection?: string[] | boolean,
  ): Promise<AmbienteListOutputDto>;

  /**
   * Busca um ambiente por ID
   */
  ambienteFindById(
    accessContext: AccessContext | null,
    dto: AmbienteFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<AmbienteFindOneOutputDto | null>;

  /**
   * Busca um ambiente por ID (lança exceção se não encontrado)
   */
  ambienteFindByIdStrict(
    accessContext: AccessContext | null,
    dto: AmbienteFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<AmbienteFindOneOutputDto>;

  /**
   * Cria um novo ambiente
   */
  ambienteCreate(
    accessContext: AccessContext,
    dto: AmbienteCreateInputDto,
  ): Promise<AmbienteFindOneOutputDto>;

  /**
   * Atualiza um ambiente existente
   */
  ambienteUpdate(
    accessContext: AccessContext,
    dto: AmbienteFindOneInputDto & AmbienteUpdateInputDto,
  ): Promise<AmbienteFindOneOutputDto>;

  /**
   * Obtém a imagem de capa do ambiente
   */
  ambienteGetImagemCapa(accessContext: AccessContext | null, id: string): Promise<StreamableFile>;

  /**
   * Atualiza a imagem de capa do ambiente
   */
  ambienteUpdateImagemCapa(
    accessContext: AccessContext,
    dto: AmbienteFindOneInputDto,
    file: Express.Multer.File,
  ): Promise<boolean>;

  /**
   * Remove um ambiente (soft delete)
   */
  ambienteDeleteOneById(
    accessContext: AccessContext,
    dto: AmbienteFindOneInputDto,
  ): Promise<boolean>;
}
