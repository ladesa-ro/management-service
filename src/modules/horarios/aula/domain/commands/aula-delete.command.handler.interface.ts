import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { AulaFindOneInputDto } from "../../application/dtos";

export type IAulaDeleteCommand = {
  accessContext: AccessContext;
  dto: AulaFindOneInputDto;
};

export type IAulaDeleteCommandHandler = ICommandHandler<IAulaDeleteCommand, boolean>;
export const IAulaDeleteCommandHandler = Symbol("IAulaDeleteCommandHandler");
