import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { EstagiarioFindOneQuery, EstagiarioFindOneQueryResult } from "../queries";
import type { EstagiarioUpdateCommand } from "./estagiario-update.command";

export const EstagiarioUpdateCommandMetadata = createOperationMetadata({
  operationId: "estagiarioUpdate",
  summary: "Atualiza um estagiário",
});

export const IEstagiarioUpdateCommandHandler = Symbol("IEstagiarioUpdateCommandHandler");

export type IEstagiarioUpdateCommandHandler = ICommandHandler<
  EstagiarioFindOneQuery & EstagiarioUpdateCommand,
  EstagiarioFindOneQueryResult
>;
