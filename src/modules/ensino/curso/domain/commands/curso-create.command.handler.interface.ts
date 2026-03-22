import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { CursoFindOneQueryResult } from "../queries";
import type { CursoCreateCommand } from "./curso-create.command";

export const CursoCreateCommandMetadata = createOperationMetadata({
  operationId: "cursoCreate",
  summary: "Cria um curso",
});

export const ICursoCreateCommandHandler = Symbol("ICursoCreateCommandHandler");

export type ICursoCreateCommandHandler = ICommandHandler<
  CursoCreateCommand,
  CursoFindOneQueryResult
>;
