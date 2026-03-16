import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type {
  HorarioMescladoQuery,
  TurmaHorarioSemanalQuery,
  UsuarioHorarioSemanalQuery,
} from "./horario-semanal.query";
import type { HorarioSemanalQueryResult } from "./horario-semanal.query.result";

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

export const IHorarioConsultaQueryHandler = Symbol("IHorarioConsultaQueryHandler");
