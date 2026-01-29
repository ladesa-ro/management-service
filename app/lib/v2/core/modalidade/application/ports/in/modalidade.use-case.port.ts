import type { AccessContext } from "@/old/infrastructure/access-context";
import type {
  ModalidadeCreateInputDto,
  ModalidadeFindOneInputDto,
  ModalidadeFindOneOutputDto,
  ModalidadeListInputDto,
  ModalidadeListOutputDto,
  ModalidadeUpdateInputDto,
} from "@/v2/server/modules/modalidade/http/dto";

/**
 * Port de entrada para casos de uso de Modalidade
 * Define o contrato que o service deve implementar
 */
export interface IModalidadeUseCasePort {
  /**
   * Lista modalidades com paginação
   */
  modalidadeFindAll(
    accessContext: AccessContext,
    dto: ModalidadeListInputDto | null,
    selection?: string[],
  ): Promise<ModalidadeListOutputDto>;

  /**
   * Busca uma modalidade por ID
   */
  modalidadeFindById(
    accessContext: AccessContext | null,
    dto: ModalidadeFindOneInputDto,
    selection?: string[],
  ): Promise<ModalidadeFindOneOutputDto | null>;

  /**
   * Busca uma modalidade por ID (lança exceção se não encontrado)
   */
  modalidadeFindByIdStrict(
    accessContext: AccessContext,
    dto: ModalidadeFindOneInputDto,
    selection?: string[],
  ): Promise<ModalidadeFindOneOutputDto>;

  /**
   * Busca uma modalidade por ID (formato simples)
   */
  modalidadeFindByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<ModalidadeFindOneOutputDto | null>;

  /**
   * Busca uma modalidade por ID (formato simples, lança exceção se não encontrado)
   */
  modalidadeFindByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<ModalidadeFindOneOutputDto>;

  /**
   * Cria uma nova modalidade
   */
  modalidadeCreate(
    accessContext: AccessContext,
    dto: ModalidadeCreateInputDto,
  ): Promise<ModalidadeFindOneOutputDto>;

  /**
   * Atualiza uma modalidade existente
   */
  modalidadeUpdate(
    accessContext: AccessContext,
    dto: ModalidadeFindOneInputDto & ModalidadeUpdateInputDto,
  ): Promise<ModalidadeFindOneOutputDto>;

  /**
   * Remove uma modalidade (soft delete)
   */
  modalidadeDeleteOneById(
    accessContext: AccessContext,
    dto: ModalidadeFindOneInputDto,
  ): Promise<boolean>;
}
