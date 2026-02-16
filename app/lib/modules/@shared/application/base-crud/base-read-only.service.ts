import type { AccessContext } from "@/modules/@core/contexto-acesso";
import { ResourceNotFoundError } from "../errors";
import type { IReadOnlyRepositoryPort } from "../ports/out";

/**
 * Classe base abstrata para services somente leitura.
 *
 * Fornece implementações padrão para:
 * - findAll: listagem com paginação
 * - findById: busca por ID
 * - findByIdStrict: busca por ID com exceção se não encontrado
 *
 * @template ListInputDto - Tipo do DTO de entrada para listagem
 * @template ListOutputDto - Tipo do DTO de saída para listagem
 * @template FindOneInputDto - Tipo do DTO de entrada para busca única
 * @template FindOneOutputDto - Tipo do DTO de saída para busca única
 */
export abstract class BaseReadOnlyService<
  ListInputDto,
  ListOutputDto,
  FindOneInputDto extends { id: string | number },
  FindOneOutputDto extends { id: string | number },
> {
  protected abstract readonly resourceName: string;

  protected abstract readonly repository: IReadOnlyRepositoryPort<
    ListInputDto,
    ListOutputDto,
    FindOneInputDto,
    FindOneOutputDto
  >;

  async findAll(
    accessContext: AccessContext,
    dto: ListInputDto | null = null,
  ): Promise<ListOutputDto> {
    return this.repository.findAll(accessContext, dto);
  }

  async findById(
    accessContext: AccessContext,
    dto: FindOneInputDto,
  ): Promise<FindOneOutputDto | null> {
    return this.repository.findById(accessContext, dto);
  }

  async findByIdStrict(
    accessContext: AccessContext,
    dto: FindOneInputDto,
  ): Promise<FindOneOutputDto> {
    const entity = await this.findById(accessContext, dto);

    if (!entity) {
      throw new ResourceNotFoundError(this.resourceName, dto.id);
    }

    return entity;
  }
}
