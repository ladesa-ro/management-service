import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { UsuarioFindOneQueryResult } from "../queries";
import type { UsuarioCreateCommand } from "./usuario-create.command";
export type IUsuarioCreateCommand = {
  accessContext: AccessContext;
  dto: UsuarioCreateCommand;
};

export type IUsuarioCreateCommandHandler = ICommandHandler<
  IUsuarioCreateCommand,
  UsuarioFindOneQueryResult
>;
export const IUsuarioCreateCommandHandler = Symbol("IUsuarioCreateCommandHandler");
