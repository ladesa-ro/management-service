import type { ICommandHandler } from "@/domain/abstractions";
import type { EmpresaFindOneQuery } from "../queries";

export const IEmpresaDeleteCommandHandler = Symbol("IEmpresaDeleteCommandHandler");

export type IEmpresaDeleteCommandHandler = ICommandHandler<EmpresaFindOneQuery, void>;
