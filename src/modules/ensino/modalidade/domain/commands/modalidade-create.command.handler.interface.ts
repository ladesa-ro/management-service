import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { ModalidadeCreateInputDto, ModalidadeFindOneOutputDto } from "../../application/dtos";

export type IModalidadeCreateCommand = {
  accessContext: AccessContext;
  dto: ModalidadeCreateInputDto;
};

export type IModalidadeCreateCommandHandler = ICommandHandler<
  IModalidadeCreateCommand,
  ModalidadeFindOneOutputDto
>;
export const IModalidadeCreateCommandHandler = Symbol("IModalidadeCreateCommandHandler");
