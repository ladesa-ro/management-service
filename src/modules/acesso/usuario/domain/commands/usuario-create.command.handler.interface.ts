import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { UsuarioFindOneQueryResult } from "../queries";
import type { UsuarioCreateCommand } from "./usuario-create.command";

export type IUsuarioCreateCommandHandler = ICommandHandler<
  UsuarioCreateCommand,
  UsuarioFindOneQueryResult
>;
export const IUsuarioCreateCommandHandler = Symbol("IUsuarioCreateCommandHandler");
