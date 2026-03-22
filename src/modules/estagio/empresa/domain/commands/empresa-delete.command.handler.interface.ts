import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { EmpresaFindOneQuery } from "../queries";

export const EmpresaDeleteCommandMetadata = createOperationMetadata({
  operationId: "empresaDeleteOneById",
  summary: "Deleta uma empresa",
});

export const IEmpresaDeleteCommandHandler = Symbol("IEmpresaDeleteCommandHandler");

export type IEmpresaDeleteCommandHandler = ICommandHandler<EmpresaFindOneQuery, void>;
