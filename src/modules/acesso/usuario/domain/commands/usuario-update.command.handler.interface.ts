import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { UsuarioFindOneQuery, UsuarioFindOneQueryResult } from "../queries";
import type { UsuarioUpdateCommand } from "./usuario-update.command";

export const IUsuarioUpdateCommandHandler = Symbol("IUsuarioUpdateCommandHandler");

export type IUsuarioUpdateCommandHandler = ICommandHandler<
  UsuarioFindOneQuery & UsuarioUpdateCommand,
  UsuarioFindOneQueryResult
>;
