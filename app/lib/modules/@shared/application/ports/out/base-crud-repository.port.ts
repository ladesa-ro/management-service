import type { ICreateRepositoryPort } from "./create-repository.port";
import type { IFindOneRepositoryPort } from "./find-one-repository.port";
import type { IListRepositoryPort } from "./list-repository.port";
import type { ISoftDeleteRepositoryPort } from "./soft-delete-repository.port";

/**
 * Interface base para ports de repositório (saída)
 * Compõe todas as operações CRUD padrão que todo repositório deve implementar
 *
 * @template Entity - Tipo da entidade do repositório
 * @template ListOutputDto - Tipo do DTO de saída para listagem (paginado)
 * @template FindOneOutputDto - Tipo do DTO de saída para busca única
 */
export interface IBaseCrudRepositoryPort<Entity, ListOutputDto, FindOneOutputDto>
  extends IListRepositoryPort<ListOutputDto>,
    IFindOneRepositoryPort<FindOneOutputDto>,
    ICreateRepositoryPort<Entity>,
    ISoftDeleteRepositoryPort {}
