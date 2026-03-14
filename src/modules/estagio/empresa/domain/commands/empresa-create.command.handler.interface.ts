import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { EmpresaFindOneQueryResult } from "../queries";
import type { EmpresaCreateCommand } from "./empresa-create.command";
export type IEmpresaCreateCommand = {
  accessContext: AccessContext;
  dto: EmpresaCreateCommand;
};

export type IEmpresaCreateCommandHandler = ICommandHandler<
  IEmpresaCreateCommand,
  EmpresaFindOneQueryResult
>;
export const IEmpresaCreateCommandHandler = Symbol("IEmpresaCreateCommandHandler");
