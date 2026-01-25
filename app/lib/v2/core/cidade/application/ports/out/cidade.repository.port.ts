import type { AccessContext } from "@/infrastructure/access-context";
import type {
  CidadeFindOneInputDto,
  CidadeFindOneOutputDto,
  CidadeListInputDto,
  CidadeListOutputDto,
} from "@/v2/adapters/in/http/cidade/dto";

/**
 * Port de saída para operações de persistência de Cidade
 * Define o contrato que os adapters de persistência devem implementar
 */
export interface ICidadeRepositoryPort {
  /**
   * Lista cidades com paginação
   * @param accessContext Contexto de acesso para aplicar filtros de permissão
   * @param dto DTO com critérios de busca e paginação
   * @param selection Campos a serem selecionados (GraphQL/otimização)
   * @returns Lista paginada de cidades
   */
  findAll(
    accessContext: AccessContext,
    dto: CidadeListInputDto | null,
    selection?: string[],
  ): Promise<CidadeListOutputDto>;

  /**
   * Busca uma cidade por ID
   * @param accessContext Contexto de acesso para aplicar filtros de permissão
   * @param dto DTO com ID da cidade
   * @param selection Campos a serem selecionados
   * @returns Cidade encontrada ou null
   */
  findById(
    accessContext: AccessContext,
    dto: CidadeFindOneInputDto,
    selection?: string[],
  ): Promise<CidadeFindOneOutputDto | null>;
}
