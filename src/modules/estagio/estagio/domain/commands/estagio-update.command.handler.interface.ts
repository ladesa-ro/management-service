import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { EstagioFindOneQuery, EstagioFindOneQueryResult } from "../queries";
import type { EstagioUpdateCommand } from "./estagio-update.command";

export const EstagioUpdateCommandMetadata = createOperationMetadata({
  operationId: "estagioUpdate",
  summary: "Atualiza um estágio",
});

export const IEstagioUpdateCommandHandler = Symbol("IEstagioUpdateCommandHandler");

export type IEstagioUpdateCommandHandler = ICommandHandler<
  EstagioFindOneQuery & EstagioUpdateCommand,
  EstagioFindOneQueryResult
>;
