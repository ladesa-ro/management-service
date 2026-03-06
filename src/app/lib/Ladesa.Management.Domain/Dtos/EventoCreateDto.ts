import { type ScalarDateTimeString } from "@/Ladesa.Management.Application/@shared";
import { IFindOneByIdDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/IFindOneByIdDto";
import { type Ambiente } from "@/Ladesa.Management.Domain/Entities/Ambiente";
import { type CalendarioLetivo } from "@/Ladesa.Management.Domain/Entities/CalendarioLetivo";

/**
 * Interface para criação de Evento
 */
export interface EventoCreateDto {
  nome?: string | null;
  rrule: string;
  cor?: string | null;
  dataInicio?: ScalarDateTimeString | null;
  dataFim?: ScalarDateTimeString | null;
  calendario: IFindOneByIdDto<CalendarioLetivo["id"]>;
  ambiente?: IFindOneByIdDto<Ambiente["id"]> | null;
}
