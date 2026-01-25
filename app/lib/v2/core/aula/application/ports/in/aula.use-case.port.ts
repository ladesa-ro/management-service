import type { AccessContext } from "@/infrastructure/access-context";
import type {
  AulaCreateInputDto,
  AulaFindOneInputDto,
  AulaFindOneOutputDto,
  AulaListInputDto,
  AulaListOutputDto,
  AulaUpdateInputDto,
} from "@/v2/adapters/in/http/aula/dto";

/**
 * Porta de entrada (use case) para operações de Aula
 * Define os casos de uso disponíveis para o domínio
 */
export interface IAulaUseCasePort {
  /**
   * Lista todas as aulas com paginação
   */
  aulaFindAll(
    accessContext: AccessContext,
    dto: AulaListInputDto | null,
    selection?: string[] | boolean,
  ): Promise<AulaListOutputDto>;

  /**
   * Busca uma aula por ID
   */
  aulaFindById(
    accessContext: AccessContext,
    dto: AulaFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<AulaFindOneOutputDto | null>;

  /**
   * Busca uma aula por ID, lançando exceção se não encontrada
   */
  aulaFindByIdStrict(
    accessContext: AccessContext,
    dto: AulaFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<AulaFindOneOutputDto>;

  /**
   * Busca uma aula por ID (versão simplificada)
   */
  aulaFindByIdSimple(
    accessContext: AccessContext,
    id: AulaFindOneInputDto["id"],
    selection?: string[] | boolean,
  ): Promise<AulaFindOneOutputDto | null>;

  /**
   * Busca uma aula por ID (versão simplificada), lançando exceção se não encontrada
   */
  aulaFindByIdSimpleStrict(
    accessContext: AccessContext,
    id: AulaFindOneInputDto["id"],
    selection?: string[] | boolean,
  ): Promise<AulaFindOneOutputDto>;

  /**
   * Cria uma nova aula
   */
  aulaCreate(accessContext: AccessContext, dto: AulaCreateInputDto): Promise<AulaFindOneOutputDto>;

  /**
   * Atualiza uma aula existente
   */
  aulaUpdate(
    accessContext: AccessContext,
    dto: AulaFindOneInputDto & AulaUpdateInputDto,
  ): Promise<AulaFindOneOutputDto>;

  /**
   * Remove uma aula por ID (soft delete)
   */
  aulaDeleteOneById(accessContext: AccessContext, dto: AulaFindOneInputDto): Promise<boolean>;
}
