import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { DiaCalendarioFindOneInputDto } from "../../application/dtos";

export type IDiaCalendarioDeleteCommand = {
  accessContext: AccessContext;
  dto: DiaCalendarioFindOneInputDto;
};

export type IDiaCalendarioDeleteCommandHandler = ICommandHandler<
  IDiaCalendarioDeleteCommand,
  boolean
>;
export const IDiaCalendarioDeleteCommandHandler = Symbol("IDiaCalendarioDeleteCommandHandler");
