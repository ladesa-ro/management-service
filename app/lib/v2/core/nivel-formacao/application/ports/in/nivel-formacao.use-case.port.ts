import type { AccessContext } from "@/old/infrastructure/access-context";
import type {
  NivelFormacaoCreateInputDto,
  NivelFormacaoFindOneInputDto,
  NivelFormacaoFindOneOutputDto,
  NivelFormacaoListInputDto,
  NivelFormacaoListOutputDto,
  NivelFormacaoUpdateInputDto,
} from "@/v2/server/modules/nivel-formacao/http/dto";

/**
 * Port de entrada para casos de uso de NivelFormacao
 * Define o contrato que o service deve implementar
 */
export interface INivelFormacaoUseCasePort {
  /**
   * Lista níveis de formação com paginação
   */
  nivelFormacaoFindAll(
    accessContext: AccessContext,
    dto: NivelFormacaoListInputDto | null,
    selection?: string[],
  ): Promise<NivelFormacaoListOutputDto>;

  /**
   * Busca um nível de formação por ID
   */
  nivelFormacaoFindById(
    accessContext: AccessContext | null,
    dto: NivelFormacaoFindOneInputDto,
    selection?: string[],
  ): Promise<NivelFormacaoFindOneOutputDto | null>;

  /**
   * Busca um nível de formação por ID (lança exceção se não encontrado)
   */
  nivelFormacaoFindByIdStrict(
    accessContext: AccessContext,
    dto: NivelFormacaoFindOneInputDto,
    selection?: string[],
  ): Promise<NivelFormacaoFindOneOutputDto>;

  /**
   * Busca um nível de formação por ID (formato simples)
   */
  nivelFormacaoFindByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<NivelFormacaoFindOneOutputDto | null>;

  /**
   * Busca um nível de formação por ID (formato simples, lança exceção se não encontrado)
   */
  nivelFormacaoFindByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<NivelFormacaoFindOneOutputDto>;

  /**
   * Cria um novo nível de formação
   */
  nivelFormacaoCreate(
    accessContext: AccessContext,
    dto: NivelFormacaoCreateInputDto,
  ): Promise<NivelFormacaoFindOneOutputDto>;

  /**
   * Atualiza um nível de formação existente
   */
  nivelFormacaoUpdate(
    accessContext: AccessContext,
    dto: NivelFormacaoFindOneInputDto & NivelFormacaoUpdateInputDto,
  ): Promise<NivelFormacaoFindOneOutputDto>;

  /**
   * Remove um nível de formação (soft delete)
   */
  nivelFormacaoDeleteOneById(
    accessContext: AccessContext,
    dto: NivelFormacaoFindOneInputDto,
  ): Promise<boolean>;
}
