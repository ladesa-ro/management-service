import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { CursoFindOneQueryResult } from "../queries";
import type { CursoCreateCommand } from "./curso-create.command";

export type ICursoCreateCommandHandler = ICommandHandler<
  CursoCreateCommand,
  CursoFindOneQueryResult
>;
export const ICursoCreateCommandHandler = Symbol("ICursoCreateCommandHandler");
