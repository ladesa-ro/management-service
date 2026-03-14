import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { CursoFindOneQuery, CursoFindOneQueryResult } from "../queries";
import type { CursoUpdateCommand } from "./curso-update.command";
export type ICursoUpdateCommand = {
  accessContext: AccessContext;
  dto: CursoFindOneQuery & CursoUpdateCommand;
};

export type ICursoUpdateCommandHandler = ICommandHandler<
  ICursoUpdateCommand,
  CursoFindOneQueryResult
>;
export const ICursoUpdateCommandHandler = Symbol("ICursoUpdateCommandHandler");
