import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type {
  EmpresaCreateInputDto,
  EmpresaFindOneInputDto,
  EmpresaFindOneOutputDto,
  EmpresaListInputDto,
  EmpresaListOutputDto,
  EmpresaUpdateInputDto,
} from "@/modules/estagio/empresa/application/dtos";

/**
 * Symbol para injetar a porta de repositório
 */
export const EMPRESA_REPOSITORY_PORT = Symbol("EMPRESA_REPOSITORY_PORT");

/**
 * Interface da porta de repositório
 */
export interface IEmpresaRepositoryPort {
  findAll(
    accessContext: AccessContext,
    dto: EmpresaListInputDto | null,
    selection?: string[] | boolean,
  ): Promise<EmpresaListOutputDto>;

  findById(
    accessContext: AccessContext | null,
    dto: EmpresaFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<EmpresaFindOneOutputDto | null>;

  create(
    accessContext: AccessContext,
    dto: EmpresaCreateInputDto,
  ): Promise<EmpresaFindOneOutputDto>;

  update(
    accessContext: AccessContext,
    id: string,
    dto: EmpresaUpdateInputDto,
  ): Promise<EmpresaFindOneOutputDto>;

  delete(accessContext: AccessContext, id: string): Promise<void>;
}
