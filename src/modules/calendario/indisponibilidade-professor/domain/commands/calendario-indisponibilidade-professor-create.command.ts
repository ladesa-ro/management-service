import type { ObjectUuidRef } from "@/domain/abstractions";
import { CalendarioIndisponibilidadeProfessorFields } from "../calendario-indisponibilidade-professor.fields";
import type { CalendarioIndisponibilidadeProfessorTipo } from "../calendario-indisponibilidade-professor.types";

export const CalendarioIndisponibilidadeProfessorCreateCommandFields = {
  perfil: CalendarioIndisponibilidadeProfessorFields.perfil,
  tipo: CalendarioIndisponibilidadeProfessorFields.tipo,
  diaSemana: CalendarioIndisponibilidadeProfessorFields.diaSemana,
  data: CalendarioIndisponibilidadeProfessorFields.data,
  inicio: CalendarioIndisponibilidadeProfessorFields.inicio,
  fim: CalendarioIndisponibilidadeProfessorFields.fim,
  motivo: CalendarioIndisponibilidadeProfessorFields.motivo,
};

export class CalendarioIndisponibilidadeProfessorCreateCommand {
  perfil!: ObjectUuidRef;
  tipo!: CalendarioIndisponibilidadeProfessorTipo;
  diaSemana?: number | null;
  data?: string | null;
  inicio!: string;
  fim!: string;
  motivo?: string | null;
}
