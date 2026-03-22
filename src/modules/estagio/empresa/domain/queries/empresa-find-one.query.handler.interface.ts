import type { IQueryHandler } from "@/domain/abstractions";
import type { EmpresaFindOneQuery } from "./empresa-find-one.query";
import type { EmpresaFindOneQueryResult } from "./empresa-find-one.query.result";

export const IEmpresaFindOneQueryHandler = Symbol("IEmpresaFindOneQueryHandler");

export type IEmpresaFindOneQueryHandler = IQueryHandler<
  EmpresaFindOneQuery,
  EmpresaFindOneQueryResult | null
>;
