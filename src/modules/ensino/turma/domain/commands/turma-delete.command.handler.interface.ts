import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { TurmaFindOneInputDto } from "../../application/dtos";

export type ITurmaDeleteCommand = {
  accessContext: AccessContext;
  dto: TurmaFindOneInputDto;
};

export type ITurmaDeleteCommandHandler = ICommandHandler<ITurmaDeleteCommand, boolean>;
export const ITurmaDeleteCommandHandler = Symbol("ITurmaDeleteCommandHandler");
