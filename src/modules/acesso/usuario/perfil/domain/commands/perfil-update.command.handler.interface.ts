import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { PerfilFindOneQuery, PerfilFindOneQueryResult } from "../queries";
import type { PerfilUpdateCommand } from "./perfil-update.command";

export const PerfilUpdateCommandMetadata = createOperationMetadata({
  operationId: "perfilUpdate",
  summary: "Atualiza um perfil (vinculo)",
});

export const IPerfilUpdateCommandHandler = Symbol("IPerfilUpdateCommandHandler");

export type IPerfilUpdateCommandHandler = ICommandHandler<
  PerfilFindOneQuery & PerfilUpdateCommand,
  PerfilFindOneQueryResult
>;
