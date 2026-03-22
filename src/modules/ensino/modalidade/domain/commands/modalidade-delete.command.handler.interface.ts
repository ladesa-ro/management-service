import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { ModalidadeFindOneQuery } from "../queries";

export const ModalidadeDeleteCommandMetadata = createOperationMetadata({
  operationId: "modalidadeDeleteOneById",
  summary: "Remove uma modalidade",
});

export const IModalidadeDeleteCommandHandler = Symbol("IModalidadeDeleteCommandHandler");

export type IModalidadeDeleteCommandHandler = ICommandHandler<ModalidadeFindOneQuery, boolean>;
