import type { IFindOneRepositoryPort } from "@/Ladesa.Management.Domain/Abstractions/Repositories/IFindOneRepositoryPort";
import type { IListRepositoryPort } from "@/Ladesa.Management.Domain/Abstractions/Repositories/IListRepositoryPort";
import type { IPersistRepositoryPort } from "@/Ladesa.Management.Domain/Abstractions/Repositories/IPersistRepositoryPort";
import type { ISoftDeleteRepositoryPort } from "@/Ladesa.Management.Domain/Abstractions/Repositories/ISoftDeleteRepositoryPort";

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
