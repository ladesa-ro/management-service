import type { ICommandHandler } from "@/domain/abstractions";
import type { EmpresaFindOneQuery, EmpresaFindOneQueryResult } from "../queries";
import type { EmpresaUpdateCommand } from "./empresa-update.command";

export const IEmpresaUpdateCommandHandler = Symbol("IEmpresaUpdateCommandHandler");

export type IEmpresaUpdateCommandHandler = ICommandHandler<
  EmpresaFindOneQuery & EmpresaUpdateCommand,
  EmpresaFindOneQueryResult
>;
