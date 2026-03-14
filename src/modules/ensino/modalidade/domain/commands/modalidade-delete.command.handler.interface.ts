import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { ModalidadeFindOneQuery } from "../queries";
export type IModalidadeDeleteCommand = {
  accessContext: AccessContext;
  dto: ModalidadeFindOneQuery;
};

export type IModalidadeDeleteCommandHandler = ICommandHandler<IModalidadeDeleteCommand, boolean>;
export const IModalidadeDeleteCommandHandler = Symbol("IModalidadeDeleteCommandHandler");
