import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";

export type IEmpresaDeleteCommand = {
  accessContext: AccessContext;
  id: string;
};

export type IEmpresaDeleteCommandHandler = ICommandHandler<IEmpresaDeleteCommand, void>;
export const IEmpresaDeleteCommandHandler = Symbol("IEmpresaDeleteCommandHandler");
