import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";

export type IEstagiarioDeleteCommand = {
  accessContext: AccessContext;
  id: string;
};

export type IEstagiarioDeleteCommandHandler = ICommandHandler<IEstagiarioDeleteCommand, void>;
export const IEstagiarioDeleteCommandHandler = Symbol("IEstagiarioDeleteCommandHandler");
