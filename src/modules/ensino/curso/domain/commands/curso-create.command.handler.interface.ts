import type { ICommandHandler } from "@/domain/abstractions";
import type { CursoFindOneQueryResult } from "../queries";
import type { CursoCreateCommand } from "./curso-create.command";

export const ICursoCreateCommandHandler = Symbol("ICursoCreateCommandHandler");

export type ICursoCreateCommandHandler = ICommandHandler<
  CursoCreateCommand,
  CursoFindOneQueryResult
>;
