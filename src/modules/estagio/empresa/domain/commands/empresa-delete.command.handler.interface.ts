import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { EmpresaFindOneQuery } from "../queries";

export const IEmpresaDeleteCommandHandler = Symbol("IEmpresaDeleteCommandHandler");

export type IEmpresaDeleteCommandHandler = ICommandHandler<EmpresaFindOneQuery, void>;
