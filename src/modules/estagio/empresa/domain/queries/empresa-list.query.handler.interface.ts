import type { IQueryHandler } from "@/domain/abstractions";
import type { EmpresaListQuery } from "./empresa-list.query";
import type { EmpresaListQueryResult } from "./empresa-list.query.result";

export const IEmpresaListQueryHandler = Symbol("IEmpresaListQueryHandler");

export type IEmpresaListQueryHandler = IQueryHandler<
  EmpresaListQuery | null,
  EmpresaListQueryResult
>;
