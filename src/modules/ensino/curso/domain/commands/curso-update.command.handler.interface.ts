import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { CursoFindOneQuery, CursoFindOneQueryResult } from "../queries";
import type { CursoUpdateCommand } from "./curso-update.command";

export const CursoUpdateCommandMetadata = createOperationMetadata({
  operationId: "cursoUpdate",
  summary: "Atualiza um curso",
});

export const ICursoUpdateCommandHandler = Symbol("ICursoUpdateCommandHandler");

export type ICursoUpdateCommandHandler = ICommandHandler<
  CursoFindOneQuery & CursoUpdateCommand,
  CursoFindOneQueryResult
>;
