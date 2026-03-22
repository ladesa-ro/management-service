import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { ModalidadeFindOneQuery, ModalidadeFindOneQueryResult } from "../queries";
import type { ModalidadeUpdateCommand } from "./modalidade-update.command";

export const ModalidadeUpdateCommandMetadata = createOperationMetadata({
  operationId: "modalidadeUpdate",
  summary: "Atualiza uma modalidade",
});

export const IModalidadeUpdateCommandHandler = Symbol("IModalidadeUpdateCommandHandler");

export type IModalidadeUpdateCommandHandler = ICommandHandler<
  ModalidadeFindOneQuery & ModalidadeUpdateCommand,
  ModalidadeFindOneQueryResult
>;
