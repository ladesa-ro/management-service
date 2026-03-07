import { EntityOutputDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/EntityOutputDto";
import type { ScalarDate } from "@/Ladesa.Management.Domain/Abstractions/Scalars";
import { CalendarioLetivoFindOneOutputDto } from "./CalendarioLetivoFindOneOutputDto";

export class DiaCalendarioFindOneOutputDto extends EntityOutputDto {
  data!: ScalarDate;
  diaLetivo!: boolean;
  feriado!: string;
  diaPresencial!: boolean;
  tipo!: string;
  extraCurricular!: boolean;
  calendario!: CalendarioLetivoFindOneOutputDto;
}
