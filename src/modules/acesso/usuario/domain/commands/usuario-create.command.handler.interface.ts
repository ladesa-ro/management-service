import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { UsuarioFindOneQueryResult } from "../queries";
import type { UsuarioCreateCommand } from "./usuario-create.command";

export const UsuarioCreateCommandMetadata = createOperationMetadata({
  operationId: "usuarioCreate",
  summary: "Cria um usuario",
});

export const IUsuarioCreateCommandHandler = Symbol("IUsuarioCreateCommandHandler");

export type IUsuarioCreateCommandHandler = ICommandHandler<
  UsuarioCreateCommand,
  UsuarioFindOneQueryResult
>;
