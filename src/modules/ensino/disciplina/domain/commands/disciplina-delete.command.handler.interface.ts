import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { DisciplinaFindOneQuery } from "../queries";
export type IDisciplinaDeleteCommand = {
  accessContext: AccessContext;
  dto: DisciplinaFindOneQuery;
};

export type IDisciplinaDeleteCommandHandler = ICommandHandler<IDisciplinaDeleteCommand, boolean>;
export const IDisciplinaDeleteCommandHandler = Symbol("IDisciplinaDeleteCommandHandler");
