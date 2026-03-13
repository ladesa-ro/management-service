import type { IFindOneRepositoryPort } from "./find-one-repository.port";
import type { IListRepositoryPort } from "./list-repository.port";
import type { IPersistRepositoryPort } from "./persist-repository.port";
import type { ISoftDeleteRepositoryPort } from "./soft-delete-repository.port";

/**
 * Interface base para ports de repositório (saída)
 * Compõe todas as operações CRUD padrão que todo repositório deve implementar
 *
 * @template DomainData - Tipo da interface de domínio (ex: IAmbiente, ICampus)
 * @template ListOutputDto - Tipo do DTO de saída para listagem (paginado)
 * @template FindOneOutputDto - Tipo do DTO de saída para busca única
 */
export interface IBaseCrudRepositoryPort<DomainData, ListOutputDto, FindOneOutputDto>
  extends IListRepositoryPort<ListOutputDto>,
    IFindOneRepositoryPort<FindOneOutputDto>,
    IPersistRepositoryPort<DomainData>,
    ISoftDeleteRepositoryPort {}
