import type { ICommandHandler } from "@/domain/abstractions";
import type { EnderecoInputCommand } from "./endereco-input.command";

export type IEnderecoCreateOrUpdateCommand = {
  id: string | null;
  dto: EnderecoInputCommand;
};

export const IEnderecoCreateOrUpdateCommandHandler = Symbol(
  "IEnderecoCreateOrUpdateCommandHandler",
);

export type IEnderecoCreateOrUpdateCommandHandler = ICommandHandler<
  IEnderecoCreateOrUpdateCommand,
  { id: string | number }
>;
