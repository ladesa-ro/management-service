import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { EstagiarioFindOneQuery } from "../queries";

export const EstagiarioDeleteCommandMetadata = createOperationMetadata({
  operationId: "estagiarioDeleteOneById",
  summary: "Deleta um estagiário",
});

export const IEstagiarioDeleteCommandHandler = Symbol("IEstagiarioDeleteCommandHandler");

export type IEstagiarioDeleteCommandHandler = ICommandHandler<EstagiarioFindOneQuery, void>;
