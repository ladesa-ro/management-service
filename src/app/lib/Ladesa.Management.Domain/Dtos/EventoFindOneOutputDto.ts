import { EntityOutputDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/EntityOutputDto";
import type { ScalarDateTimeString } from "@/Ladesa.Management.Domain/Abstractions/Scalars";
import { AmbienteFindOneOutputDto } from "./AmbienteFindOneOutputDto";
import { CalendarioLetivoFindOneOutputDto } from "./CalendarioLetivoFindOneOutputDto";

export class EventoFindOneOutputDto extends EntityOutputDto {
  nome!: string | null;
  rrule!: string;
  cor!: string | null;
  dataInicio!: ScalarDateTimeString | null;
  dataFim!: ScalarDateTimeString | null;
  calendario!: CalendarioLetivoFindOneOutputDto;
  ambiente!: AmbienteFindOneOutputDto | null;
}
