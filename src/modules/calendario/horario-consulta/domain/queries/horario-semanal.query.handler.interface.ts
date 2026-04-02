import type { IAccessContext } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type {
  HorarioMescladoQuery,
  TurmaHorarioSemanalQuery,
  UsuarioHorarioSemanalQuery,
} from "./horario-semanal.query";
import type { HorarioSemanalQueryResult } from "./horario-semanal.query.result";

export const TurmaHorarioSemanalQueryMetadata = createOperationMetadata({
  operationId: "turmaHorarioSemanal",
  summary: "Consulta horario semanal de uma turma",
});

export const HorarioMescladoQueryMetadata = createOperationMetadata({
  operationId: "horarioMesclado",
  summary: "Consulta horario mesclado de multiplas turmas",
});

export const IHorarioConsultaQueryHandler = Symbol("IHorarioConsultaQueryHandler");

export interface IHorarioConsultaQueryHandler {
  findTurmaHorarioSemanal(
    accessContext: IAccessContext | null,
    query: TurmaHorarioSemanalQuery,
  ): Promise<HorarioSemanalQueryResult>;

  findUsuarioHorarioSemanal(
    accessContext: IAccessContext | null,
    query: UsuarioHorarioSemanalQuery,
  ): Promise<HorarioSemanalQueryResult>;

  findHorarioMesclado(
    accessContext: IAccessContext | null,
    query: HorarioMescladoQuery,
  ): Promise<HorarioSemanalQueryResult>;
}
