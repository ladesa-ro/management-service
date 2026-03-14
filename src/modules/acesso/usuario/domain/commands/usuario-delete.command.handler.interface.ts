import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { UsuarioFindOneQuery } from "../queries";
export type IUsuarioDeleteCommand = {
  accessContext: AccessContext;
  dto: UsuarioFindOneQuery;
};

export type IUsuarioDeleteCommandHandler = ICommandHandler<IUsuarioDeleteCommand, boolean>;
export const IUsuarioDeleteCommandHandler = Symbol("IUsuarioDeleteCommandHandler");
