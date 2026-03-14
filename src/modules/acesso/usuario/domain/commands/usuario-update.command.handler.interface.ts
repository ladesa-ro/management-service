import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { UsuarioFindOneQuery, UsuarioFindOneQueryResult } from "../queries";
import type { UsuarioUpdateCommand } from "./usuario-update.command";
export type IUsuarioUpdateCommand = {
  accessContext: AccessContext;
  dto: UsuarioFindOneQuery & UsuarioUpdateCommand;
};

export type IUsuarioUpdateCommandHandler = ICommandHandler<
  IUsuarioUpdateCommand,
  UsuarioFindOneQueryResult
>;
export const IUsuarioUpdateCommandHandler = Symbol("IUsuarioUpdateCommandHandler");
