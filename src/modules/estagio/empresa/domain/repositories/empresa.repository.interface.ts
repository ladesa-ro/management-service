import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
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
    accessContext: AccessContext,
    dto: EmpresaListQuery | null,
    selection?: string[] | boolean,
  ): Promise<EmpresaListQueryResult>;

  findById(
    accessContext: AccessContext | null,
    dto: EmpresaFindOneQuery,
    selection?: string[] | boolean,
  ): Promise<EmpresaFindOneQueryResult | null>;

  create(
    accessContext: AccessContext,
    dto: EmpresaCreateCommand,
  ): Promise<EmpresaFindOneQueryResult>;

  update(
    accessContext: AccessContext,
    id: string,
    dto: EmpresaUpdateCommand,
  ): Promise<EmpresaFindOneQueryResult>;

  delete(accessContext: AccessContext, id: string): Promise<void>;
}
