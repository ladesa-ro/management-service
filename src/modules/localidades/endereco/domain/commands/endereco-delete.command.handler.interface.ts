import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { EnderecoDeleteCommand } from "./endereco-delete.command";

export const EnderecoDeleteCommandMetadata = createOperationMetadata({
  operationId: "enderecoDelete",
  summary: "Deleta um endereço",
});

export const IEnderecoDeleteCommandHandler = Symbol("IEnderecoDeleteCommandHandler");

export type IEnderecoDeleteCommandHandler = ICommandHandler<
  EnderecoDeleteCommand,
  boolean
>;
