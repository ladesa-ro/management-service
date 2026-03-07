import type { ScalarDateTimeString } from "@/Ladesa.Management.Domain/Abstractions/Scalars";
import type { AmbienteInputRefDto } from "./AmbienteInputRefDto";
import type { CalendarioLetivoInputRefDto } from "./CalendarioLetivoInputRefDto";

export class EventoCreateInputDto {
  nome?: string | null;
  rrule!: string;
  cor?: string | null;
  dataInicio?: ScalarDateTimeString | null;
  dataFim?: ScalarDateTimeString | null;
  calendario!: CalendarioLetivoInputRefDto;
  ambiente?: AmbienteInputRefDto | null;
}
