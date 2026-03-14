import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { ModalidadeFindOneQueryResult } from "../queries";
import type { ModalidadeCreateCommand } from "./modalidade-create.command";
export type IModalidadeCreateCommand = {
  accessContext: AccessContext;
  dto: ModalidadeCreateCommand;
};

export type IModalidadeCreateCommandHandler = ICommandHandler<
  IModalidadeCreateCommand,
  ModalidadeFindOneQueryResult
>;
export const IModalidadeCreateCommandHandler = Symbol("IModalidadeCreateCommandHandler");
