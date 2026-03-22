import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { UsuarioFindOneQuery, UsuarioFindOneQueryResult } from "../queries";
import type { UsuarioUpdateCommand } from "./usuario-update.command";

export const UsuarioUpdateCommandMetadata = createOperationMetadata({
  operationId: "usuarioUpdate",
  summary: "Atualiza um usuario",
});

export const IUsuarioUpdateCommandHandler = Symbol("IUsuarioUpdateCommandHandler");

export type IUsuarioUpdateCommandHandler = ICommandHandler<
  UsuarioFindOneQuery & UsuarioUpdateCommand,
  UsuarioFindOneQueryResult
>;
