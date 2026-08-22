import type { ObjectUuidRef } from "@/domain/abstractions";
import { CalendarioIndisponibilidadeAmbienteFields } from "../calendario-indisponibilidade-ambiente.fields";
import type { CalendarioIndisponibilidadeAmbienteTipo } from "../calendario-indisponibilidade-ambiente.types";

export const CalendarioIndisponibilidadeAmbienteCreateCommandFields = {
  ambiente: CalendarioIndisponibilidadeAmbienteFields.ambiente,
  tipo: CalendarioIndisponibilidadeAmbienteFields.tipo,
  diaSemana: CalendarioIndisponibilidadeAmbienteFields.diaSemana,
  data: CalendarioIndisponibilidadeAmbienteFields.data,
  inicio: CalendarioIndisponibilidadeAmbienteFields.inicio,
  fim: CalendarioIndisponibilidadeAmbienteFields.fim,
  motivo: CalendarioIndisponibilidadeAmbienteFields.motivo,
};

export class CalendarioIndisponibilidadeAmbienteCreateCommand {
  ambiente!: ObjectUuidRef;
  tipo!: CalendarioIndisponibilidadeAmbienteTipo;
  diaSemana?: number | null;
  data?: string | null;
  inicio!: string;
  fim!: string;
  motivo?: string | null;
}
