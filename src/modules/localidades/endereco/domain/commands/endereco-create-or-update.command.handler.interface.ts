import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { EnderecoInputCommand } from "./endereco-input.command";
export type IEnderecoCreateOrUpdateCommand = {
  id: string | null;
  dto: EnderecoInputCommand;
};

export type IEnderecoCreateOrUpdateCommandHandler = ICommandHandler<
  IEnderecoCreateOrUpdateCommand,
  { id: string | number }
>;
export const IEnderecoCreateOrUpdateCommandHandler = Symbol(
  "IEnderecoCreateOrUpdateCommandHandler",
);
