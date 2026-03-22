import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { EmpresaFindOneQuery } from "./empresa-find-one.query";
import type { EmpresaFindOneQueryResult } from "./empresa-find-one.query.result";

export const EmpresaFindOneQueryMetadata = createOperationMetadata({
  operationId: "empresaFindById",
  summary: "Busca uma empresa por ID",
});

export const IEmpresaFindOneQueryHandler = Symbol("IEmpresaFindOneQueryHandler");

export type IEmpresaFindOneQueryHandler = IQueryHandler<
  EmpresaFindOneQuery,
  EmpresaFindOneQueryResult | null
>;
