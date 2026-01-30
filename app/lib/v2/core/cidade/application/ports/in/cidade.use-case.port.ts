import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import type {
  CidadeFindOneInputDto,
  CidadeFindOneOutputDto,
  CidadeListInputDto,
  CidadeListOutputDto,
} from "@/v2/server/modules/cidade/http/dto";

/**
 * Port de entrada para casos de uso de Cidade
 * Define o contrato que o service deve implementar
 */
export interface ICidadeUseCasePort {
  /**
   * Lista cidades com paginação
   */
  findAll(
    accessContext: AccessContext,
    dto: CidadeListInputDto | null,
    selection?: string[],
  ): Promise<CidadeListOutputDto>;

  /**
   * Busca uma cidade por ID
   */
  findById(
    accessContext: AccessContext,
    dto: CidadeFindOneInputDto,
    selection?: string[],
  ): Promise<CidadeFindOneOutputDto | null>;

  /**
   * Busca uma cidade por ID (lança exceção se não encontrado)
   */
  findByIdStrict(
    accessContext: AccessContext,
    dto: CidadeFindOneInputDto,
    selection?: string[],
  ): Promise<CidadeFindOneOutputDto>;
}
