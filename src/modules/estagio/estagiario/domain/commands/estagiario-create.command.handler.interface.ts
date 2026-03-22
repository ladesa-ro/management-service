import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { EstagiarioFindOneQueryResult } from "../queries";
import type { EstagiarioCreateCommand } from "./estagiario-create.command";

export const EstagiarioCreateCommandMetadata = createOperationMetadata({
  operationId: "estagiarioCreate",
  summary: "Cria um estagiário",
});

export const IEstagiarioCreateCommandHandler = Symbol("IEstagiarioCreateCommandHandler");

export type IEstagiarioCreateCommandHandler = ICommandHandler<
  EstagiarioCreateCommand,
  EstagiarioFindOneQueryResult
>;
