import {
  GradeHorariaFindByCampusQuery,
  type GradeHorariaFindByCampusQueryResult,
  GradeHorariaReplaceCommand,
} from "@/modules/calendario/grade-horaria/domain";
import { createMapper } from "@/shared/mapping";
import type {
  GradeHorariaCampusParamsRestDto,
  GradeHorariaListOutputRestDto,
  GradeHorariaReplaceInputRestDto,
} from "./grade-horaria.rest.dto";

// ============================================================================
// Externa -> Interna (Input: Presentation -> Core)
// ============================================================================

export const findByCampusInputDtoToFindByCampusQuery = createMapper<
  GradeHorariaCampusParamsRestDto,
  GradeHorariaFindByCampusQuery
>((dto) => {
  const query = new GradeHorariaFindByCampusQuery();
  query.campusId = dto.campusId;
  return query;
});

export const replaceInputDtoToReplaceCommand = createMapper<
  { params: GradeHorariaCampusParamsRestDto; dto: GradeHorariaReplaceInputRestDto },
  GradeHorariaReplaceCommand
>(({ params, dto }) => {
  const command = new GradeHorariaReplaceCommand();
  command.campusId = params.campusId;
  command.gradesHorarias = dto.gradesHorarias.map((g) => ({
    identificadorExterno: g.identificadorExterno,
    nome: g.nome,
    intervalos: g.intervalos.map((i) => ({ inicio: i.inicio, fim: i.fim })),
  }));
  return command;
});

// ============================================================================
// Interna -> Externa (Output: Core -> Presentation)
// ============================================================================

export const findByCampusQueryResultToOutputDto = createMapper<
  GradeHorariaFindByCampusQueryResult,
  GradeHorariaListOutputRestDto
>((queryResult) => ({
  data: queryResult.data.map((g) => ({
    identificadorExterno: g.identificadorExterno,
    nome: g.nome,
    intervalos: g.intervalos.map((i) => ({ inicio: i.inicio, fim: i.fim })),
  })),
}));
