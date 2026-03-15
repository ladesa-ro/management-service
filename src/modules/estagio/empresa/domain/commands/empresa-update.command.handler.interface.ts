import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { EmpresaFindOneQuery, EmpresaFindOneQueryResult } from "../queries";
import type { EmpresaUpdateCommand } from "./empresa-update.command";

export type IEmpresaUpdateCommandHandler = ICommandHandler<
  EmpresaFindOneQuery & EmpresaUpdateCommand,
  EmpresaFindOneQueryResult
>;
export const IEmpresaUpdateCommandHandler = Symbol("IEmpresaUpdateCommandHandler");
