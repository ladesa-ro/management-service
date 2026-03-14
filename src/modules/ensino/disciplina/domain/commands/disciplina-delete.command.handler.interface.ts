import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { DisciplinaFindOneInputDto } from "../../application/dtos";

export type IDisciplinaDeleteCommand = {
  accessContext: AccessContext;
  dto: DisciplinaFindOneInputDto;
};

export type IDisciplinaDeleteCommandHandler = ICommandHandler<IDisciplinaDeleteCommand, boolean>;
export const IDisciplinaDeleteCommandHandler = Symbol("IDisciplinaDeleteCommandHandler");
