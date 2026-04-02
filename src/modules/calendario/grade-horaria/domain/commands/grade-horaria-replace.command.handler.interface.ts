import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { GradeHorariaFindByCampusQueryResult } from "../queries";
import type { GradeHorariaReplaceCommand } from "./grade-horaria-replace.command";

export const GradeHorariaReplaceCommandMetadata = createOperationMetadata({
  operationId: "gradeHorariaReplace",
  summary: "Substitui as grades horarias de um campus (estado completo)",
});

export const IGradeHorariaReplaceCommandHandler = Symbol("IGradeHorariaReplaceCommandHandler");

export type IGradeHorariaReplaceCommandHandler = ICommandHandler<
  GradeHorariaReplaceCommand,
  GradeHorariaFindByCampusQueryResult
>;
