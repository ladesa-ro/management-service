import type { ICommandHandler } from "@/domain/abstractions";
import type { UsuarioFindOneQueryResult } from "../queries";
import type { UsuarioCreateCommand } from "./usuario-create.command";

export const IUsuarioCreateCommandHandler = Symbol("IUsuarioCreateCommandHandler");

export type IUsuarioCreateCommandHandler = ICommandHandler<
  UsuarioCreateCommand,
  UsuarioFindOneQueryResult
>;
