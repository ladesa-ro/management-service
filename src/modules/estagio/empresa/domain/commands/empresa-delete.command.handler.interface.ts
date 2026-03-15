import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { EmpresaFindOneQuery } from "../queries";

export type IEmpresaDeleteCommandHandler = ICommandHandler<EmpresaFindOneQuery, void>;
export const IEmpresaDeleteCommandHandler = Symbol("IEmpresaDeleteCommandHandler");
