import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { UsuarioFindOneQuery } from "../queries";

export const UsuarioDeleteCommandMetadata = createOperationMetadata({
  operationId: "usuarioDeleteOneById",
  summary: "Remove um usuario",
});

export const IUsuarioDeleteCommandHandler = Symbol("IUsuarioDeleteCommandHandler");

export type IUsuarioDeleteCommandHandler = ICommandHandler<UsuarioFindOneQuery, boolean>;
