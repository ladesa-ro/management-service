import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { DiarioFindOneInputDto } from "../../application/dtos";

export type IDiarioDeleteCommand = {
  accessContext: AccessContext;
  dto: DiarioFindOneInputDto;
};

export type IDiarioDeleteCommandHandler = ICommandHandler<IDiarioDeleteCommand, boolean>;
export const IDiarioDeleteCommandHandler = Symbol("IDiarioDeleteCommandHandler");
