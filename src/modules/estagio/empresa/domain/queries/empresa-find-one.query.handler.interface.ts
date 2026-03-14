import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { EmpresaFindOneQuery } from "./empresa-find-one.query";
import type { EmpresaFindOneQueryResult } from "./empresa-find-one.query.result";
export type IEmpresaFindOneQuery = {
  accessContext: AccessContext | null;
  dto: EmpresaFindOneQuery;
  selection?: string[] | boolean;
};

export type IEmpresaFindOneQueryHandler = IQueryHandler<
  IEmpresaFindOneQuery,
  EmpresaFindOneQueryResult | null
>;
export const IEmpresaFindOneQueryHandler = Symbol("IEmpresaFindOneQueryHandler");
