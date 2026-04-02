import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { GradeHorariaFindByCampusQuery } from "./grade-horaria-find-by-campus.query";
import type { GradeHorariaFindByCampusQueryResult } from "./grade-horaria-find-by-campus.query.result";

export const GradeHorariaFindByCampusQueryMetadata = createOperationMetadata({
  operationId: "gradeHorariaFindByCampus",
  summary: "Retorna as grades horarias ativas de um campus",
});

export const IGradeHorariaFindByCampusQueryHandler = Symbol(
  "IGradeHorariaFindByCampusQueryHandler",
);

export type IGradeHorariaFindByCampusQueryHandler = IQueryHandler<
  GradeHorariaFindByCampusQuery,
  GradeHorariaFindByCampusQueryResult
>;
