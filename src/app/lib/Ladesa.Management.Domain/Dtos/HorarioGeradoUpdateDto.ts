import { type ScalarDateTimeString } from "@/Ladesa.Management.Application/@shared";
import { IFindOneByIdDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/IFindOneByIdDto";
import { type CalendarioLetivo } from "@/Ladesa.Management.Domain/Entities/CalendarioLetivo";

export interface HorarioGeradoUpdateDto {
  status?: string | null;
  tipo?: string | null;
  dataGeracao?: ScalarDateTimeString | null;
  vigenciaInicio?: ScalarDateTimeString | null;
  vigenciaFim?: ScalarDateTimeString | null;
  calendario?: IFindOneByIdDto<CalendarioLetivo["id"]>;
}
