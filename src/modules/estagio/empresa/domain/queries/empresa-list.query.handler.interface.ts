import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { EmpresaListQuery } from "./empresa-list.query";
import type { EmpresaListQueryResult } from "./empresa-list.query.result";

export type IEmpresaListQueryHandler = IQueryHandler<
  EmpresaListQuery | null,
  EmpresaListQueryResult
>;
export const IEmpresaListQueryHandler = Symbol("IEmpresaListQueryHandler");
