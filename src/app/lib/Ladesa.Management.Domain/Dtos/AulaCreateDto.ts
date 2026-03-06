import type { ScalarDateTimeString } from "@/Ladesa.Management.Application/@shared";
import { IFindOneByIdDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/IFindOneByIdDto";
import { type Ambiente } from "@/Ladesa.Management.Domain/Entities/Ambiente";
import { type Diario } from "@/Ladesa.Management.Domain/Entities/Diario";
import { type IntervaloDeTempo } from "@/Ladesa.Management.Domain/Entities/IntervaloDeTempo";

/**
 * Interface para criação de Aula
 */
export interface AulaCreateDto {
  data: ScalarDateTimeString;
  modalidade?: string | null;
  intervaloDeTempo:
    | IFindOneByIdDto<IntervaloDeTempo["id"]>
    | { periodoInicio: string; periodoFim: string };
  diario: IFindOneByIdDto<Diario["id"]>;
  ambiente?: IFindOneByIdDto<Ambiente["id"]> | null;
}
