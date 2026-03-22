import { createOperationMetadata } from "@/domain/abstractions";
import type { AccessContext } from "@/server/access-context";
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
    accessContext: AccessContext | null,
    query: TurmaHorarioSemanalQuery,
  ): Promise<HorarioSemanalQueryResult>;

  findUsuarioHorarioSemanal(
    accessContext: AccessContext | null,
    query: UsuarioHorarioSemanalQuery,
  ): Promise<HorarioSemanalQueryResult>;

  findHorarioMesclado(
    accessContext: AccessContext | null,
    query: HorarioMescladoQuery,
  ): Promise<HorarioSemanalQueryResult>;
}
