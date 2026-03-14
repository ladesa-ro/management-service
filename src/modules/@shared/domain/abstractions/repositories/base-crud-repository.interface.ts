import type { IFindOneRepository } from "./find-one-repository.interface";
import type { IListRepository } from "./list-repository.interface";
import type { IPersistRepository } from "./persist-repository.interface";
import type { ISoftDeleteRepository } from "./soft-delete-repository.interface";

/**
 * Interface base para ports de repositório (saída)
 * Compõe todas as operações CRUD padrão que todo repositório deve implementar
 *
 * @template DomainData - Tipo da interface de domínio (ex: IAmbiente, ICampus)
 * @template ListOutputDto - Tipo do DTO de saída para listagem (paginado)
 * @template FindOneOutputDto - Tipo do DTO de saída para busca única
 */
export interface IBaseCrudRepository<DomainData, ListOutputDto, FindOneOutputDto>
  extends IListRepository<ListOutputDto>,
    IFindOneRepository<FindOneOutputDto>,
    IPersistRepository<DomainData>,
    ISoftDeleteRepository {}
