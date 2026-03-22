import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { EmpresaFindOneQuery, EmpresaFindOneQueryResult } from "../queries";
import type { EmpresaUpdateCommand } from "./empresa-update.command";

export const EmpresaUpdateCommandMetadata = createOperationMetadata({
  operationId: "empresaUpdate",
  summary: "Atualiza uma empresa",
});

export const IEmpresaUpdateCommandHandler = Symbol("IEmpresaUpdateCommandHandler");

export type IEmpresaUpdateCommandHandler = ICommandHandler<
  EmpresaFindOneQuery & EmpresaUpdateCommand,
  EmpresaFindOneQueryResult
>;
