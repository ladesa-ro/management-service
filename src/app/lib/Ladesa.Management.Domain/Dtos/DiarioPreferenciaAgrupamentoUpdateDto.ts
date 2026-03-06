import type { ScalarDateTimeString } from "@/Ladesa.Management.Application/@shared";
import { IFindOneByIdDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/IFindOneByIdDto";
import { type Diario } from "@/Ladesa.Management.Domain/Entities/Diario";
import { type IntervaloDeTempo } from "@/Ladesa.Management.Domain/Entities/IntervaloDeTempo";

export interface DiarioPreferenciaAgrupamentoUpdateDto {
  dataInicio?: ScalarDateTimeString;
  dataFim?: ScalarDateTimeString | null;
  diaSemanaIso?: number;
  aulasSeguidas?: number;
  intervaloDeTempo?: IFindOneByIdDto<IntervaloDeTempo["id"]>;
  diario?: IFindOneByIdDto<Diario["id"]>;
}
