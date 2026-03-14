import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type {
  ModalidadeFindOneInputDto,
  ModalidadeFindOneOutputDto,
  ModalidadeUpdateInputDto,
} from "../../application/dtos";

export type IModalidadeUpdateCommand = {
  accessContext: AccessContext;
  dto: ModalidadeFindOneInputDto & ModalidadeUpdateInputDto;
};

export type IModalidadeUpdateCommandHandler = ICommandHandler<
  IModalidadeUpdateCommand,
  ModalidadeFindOneOutputDto
>;
export const IModalidadeUpdateCommandHandler = Symbol("IModalidadeUpdateCommandHandler");
