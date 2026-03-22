import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { CursoFindOneQuery } from "../queries";

export const CursoDeleteCommandMetadata = createOperationMetadata({
  operationId: "cursoDeleteOneById",
  summary: "Remove um curso",
});

export const ICursoDeleteCommandHandler = Symbol("ICursoDeleteCommandHandler");

export type ICursoDeleteCommandHandler = ICommandHandler<CursoFindOneQuery, boolean>;
