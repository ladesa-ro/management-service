import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { EmpresaFindOneQueryResult } from "../queries";
import type { EmpresaCreateCommand } from "./empresa-create.command";

export const IEmpresaCreateCommandHandler = Symbol("IEmpresaCreateCommandHandler");

export type IEmpresaCreateCommandHandler = ICommandHandler<
  EmpresaCreateCommand,
  EmpresaFindOneQueryResult
>;
