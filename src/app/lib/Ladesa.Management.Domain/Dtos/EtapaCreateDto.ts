import type { ScalarDateTimeString } from "@/Ladesa.Management.Application/@shared";
import { IFindOneByIdDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/IFindOneByIdDto";
import { type CalendarioLetivo } from "@/Ladesa.Management.Domain/Entities/CalendarioLetivo";

export interface EtapaCreateDto {
  numero?: number | null;
  dataInicio: ScalarDateTimeString;
  dataTermino: ScalarDateTimeString;
  cor?: string | null;
  calendario: IFindOneByIdDto<CalendarioLetivo["id"]>;
}
