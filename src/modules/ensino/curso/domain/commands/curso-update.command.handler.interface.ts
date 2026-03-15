import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { CursoFindOneQuery, CursoFindOneQueryResult } from "../queries";
import type { CursoUpdateCommand } from "./curso-update.command";

export type ICursoUpdateCommandHandler = ICommandHandler<
  CursoFindOneQuery & CursoUpdateCommand,
  CursoFindOneQueryResult
>;
export const ICursoUpdateCommandHandler = Symbol("ICursoUpdateCommandHandler");
