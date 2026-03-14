import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { ModalidadeFindOneQuery, ModalidadeFindOneQueryResult } from "../queries";
import type { ModalidadeUpdateCommand } from "./modalidade-update.command";
export type IModalidadeUpdateCommand = {
  accessContext: AccessContext;
  dto: ModalidadeFindOneQuery & ModalidadeUpdateCommand;
};

export type IModalidadeUpdateCommandHandler = ICommandHandler<
  IModalidadeUpdateCommand,
  ModalidadeFindOneQueryResult
>;
export const IModalidadeUpdateCommandHandler = Symbol("IModalidadeUpdateCommandHandler");
