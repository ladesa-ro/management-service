import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { CursoFindOneQueryResult } from "../queries";
import type { CursoCreateCommand } from "./curso-create.command";
export type ICursoCreateCommand = {
  accessContext: AccessContext;
  dto: CursoCreateCommand;
};

export type ICursoCreateCommandHandler = ICommandHandler<
  ICursoCreateCommand,
  CursoFindOneQueryResult
>;
export const ICursoCreateCommandHandler = Symbol("ICursoCreateCommandHandler");
