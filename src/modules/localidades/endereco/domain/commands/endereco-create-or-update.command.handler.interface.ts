import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { EnderecoInputDto } from "../../application/dtos";

export type IEnderecoCreateOrUpdateCommand = {
  id: string | null;
  dto: EnderecoInputDto;
};

export type IEnderecoCreateOrUpdateCommandHandler = ICommandHandler<
  IEnderecoCreateOrUpdateCommand,
  { id: string | number }
>;
export const IEnderecoCreateOrUpdateCommandHandler = Symbol(
  "IEnderecoCreateOrUpdateCommandHandler",
);
