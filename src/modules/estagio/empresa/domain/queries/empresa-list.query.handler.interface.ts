import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { EmpresaListQuery } from "./empresa-list.query";
import type { EmpresaListQueryResult } from "./empresa-list.query.result";
export type IEmpresaListQuery = {
  accessContext: AccessContext;
  dto: EmpresaListQuery | null;
  selection?: string[] | boolean;
};

export type IEmpresaListQueryHandler = IQueryHandler<IEmpresaListQuery, EmpresaListQueryResult>;
export const IEmpresaListQueryHandler = Symbol("IEmpresaListQueryHandler");
