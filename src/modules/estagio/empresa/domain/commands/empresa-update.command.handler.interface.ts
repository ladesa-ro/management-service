import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { EmpresaFindOneQueryResult } from "../queries";
import type { EmpresaUpdateCommand } from "./empresa-update.command";
export type IEmpresaUpdateCommand = {
  accessContext: AccessContext;
  id: string;
  dto: EmpresaUpdateCommand;
};

export type IEmpresaUpdateCommandHandler = ICommandHandler<
  IEmpresaUpdateCommand,
  EmpresaFindOneQueryResult
>;
export const IEmpresaUpdateCommandHandler = Symbol("IEmpresaUpdateCommandHandler");
