import type { ScalarDate } from "@/Ladesa.Management.Domain/Abstractions/Scalars";
import type { CalendarioLetivoInputRefDto } from "./CalendarioLetivoInputRefDto";

export class DiaCalendarioCreateInputDto {
  data!: ScalarDate;
  diaLetivo!: boolean;
  feriado!: string;
  diaPresencial!: boolean;
  tipo!: string;
  extraCurricular!: boolean;
  calendario!: CalendarioLetivoInputRefDto;
}
