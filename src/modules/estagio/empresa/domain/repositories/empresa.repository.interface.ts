import type { AccessContext } from "@/server/access-context";
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
    accessContext: AccessContext | null,
    dto: EmpresaListQuery | null,
    selection?: string[] | boolean | null,
  ): Promise<EmpresaListQueryResult>;

  findById(
    accessContext: AccessContext | null,
    dto: EmpresaFindOneQuery,
    selection?: string[] | boolean | null,
  ): Promise<EmpresaFindOneQueryResult | null>;

  create(
    accessContext: AccessContext | null,
    dto: EmpresaCreateCommand,
  ): Promise<EmpresaFindOneQueryResult>;

  update(
    accessContext: AccessContext | null,
    id: string,
    dto: EmpresaUpdateCommand,
  ): Promise<EmpresaFindOneQueryResult>;

  delete(accessContext: AccessContext | null, id: string): Promise<void>;
}
