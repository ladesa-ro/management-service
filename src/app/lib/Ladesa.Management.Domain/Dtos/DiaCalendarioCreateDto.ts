import type { ScalarDateTimeString } from "@/Ladesa.Management.Application/@shared";
import { IFindOneByIdDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/IFindOneByIdDto";
import { type CalendarioLetivo } from "@/Ladesa.Management.Domain/Entities/CalendarioLetivo";

export interface DiaCalendarioCreateDto {
  data: ScalarDateTimeString;
  diaLetivo: boolean;
  feriado: string;
  diaPresencial: boolean;
  tipo: string;
  extraCurricular: boolean;
  calendario: IFindOneByIdDto<CalendarioLetivo["id"]>;
}
