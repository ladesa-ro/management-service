import type { IAccessContext } from "@/domain/abstractions";
import type { EmpresaCreateCommand, EmpresaUpdateCommand } from "../commands";
import type {
  EmpresaFindOneQuery,
  EmpresaFindOneQueryResult,
  EmpresaListQuery,
  EmpresaListQueryResult,
} from "../queries";
/**
 * Symbol para injetar a porta de repositório
 */
export const IEmpresaRepository = Symbol("IEmpresaRepository");

/**
 * Interface da porta de repositório
 */
export interface IEmpresaRepository {
  findAll(
    accessContext: IAccessContext | null,
    dto: EmpresaListQuery | null,
    selection?: string[] | boolean | null,
  ): Promise<EmpresaListQueryResult>;

  findById(
    accessContext: IAccessContext | null,
    dto: EmpresaFindOneQuery,
    selection?: string[] | boolean | null,
  ): Promise<EmpresaFindOneQueryResult | null>;

  create(
    accessContext: IAccessContext | null,
    dto: EmpresaCreateCommand,
  ): Promise<EmpresaFindOneQueryResult>;

  update(
    accessContext: IAccessContext | null,
    id: string,
    dto: EmpresaUpdateCommand,
  ): Promise<EmpresaFindOneQueryResult>;

  delete(accessContext: IAccessContext | null, id: string): Promise<void>;
}
