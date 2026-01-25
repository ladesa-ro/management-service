import type { AccessContext } from "@/infrastructure/access-context";
import type {
  EstadoFindOneInputDto,
  EstadoFindOneOutputDto,
  EstadoListInputDto,
  EstadoListOutputDto,
} from "@/v2/adapters/in/http/estado/dto";

/**
 * Port de saída para operações de persistência de Estado
 * Define o contrato que os adapters de persistência devem implementar
 */
export interface IEstadoRepositoryPort {
  /**
   * Lista estados com paginação
   * @param accessContext Contexto de acesso para aplicar filtros de permissão
   * @param dto DTO com critérios de busca e paginação
   * @param selection Campos a serem selecionados (GraphQL/otimização)
   * @returns Lista paginada de estados
   */
  findAll(
    accessContext: AccessContext,
    dto: EstadoListInputDto | null,
    selection?: string[],
  ): Promise<EstadoListOutputDto>;

  /**
   * Busca um estado por ID
   * @param accessContext Contexto de acesso para aplicar filtros de permissão
   * @param dto DTO com ID do estado
   * @param selection Campos a serem selecionados
   * @returns Estado encontrado ou null
   */
  findById(
    accessContext: AccessContext,
    dto: EstadoFindOneInputDto,
    selection?: string[],
  ): Promise<EstadoFindOneOutputDto | null>;
}
