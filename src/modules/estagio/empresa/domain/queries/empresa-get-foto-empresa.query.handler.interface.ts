import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { IStreamableFileResult } from "@/domain/abstractions/storage";
import type { EmpresaFindOneQuery } from "./empresa-find-one.query";

export const EmpresaGetFotoEmpresaQueryMetadata = createOperationMetadata({
  operationId: "empresaGetFotoEmpresa",
  summary: "Obtém a foto de uma empresa",
});

export const IEmpresaGetFotoEmpresaQueryHandler = Symbol("IEmpresaGetFotoEmpresaQueryHandler");

export type IEmpresaGetFotoEmpresaQueryHandler = IQueryHandler<
  EmpresaFindOneQuery,
  IStreamableFileResult
>;
