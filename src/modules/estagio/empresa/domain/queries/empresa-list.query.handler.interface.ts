import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { EmpresaListInputDto, EmpresaListOutputDto } from "../../application/dtos";

export type IEmpresaListQuery = {
  accessContext: AccessContext;
  dto: EmpresaListInputDto | null;
  selection?: string[] | boolean;
};

export type IEmpresaListQueryHandler = IQueryHandler<IEmpresaListQuery, EmpresaListOutputDto>;
export const IEmpresaListQueryHandler = Symbol("IEmpresaListQueryHandler");
