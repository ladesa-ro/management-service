import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { ModalidadeFindOneInputDto } from "../../application/dtos";

export type IModalidadeDeleteCommand = {
  accessContext: AccessContext;
  dto: ModalidadeFindOneInputDto;
};

export type IModalidadeDeleteCommandHandler = ICommandHandler<IModalidadeDeleteCommand, boolean>;
export const IModalidadeDeleteCommandHandler = Symbol("IModalidadeDeleteCommandHandler");
