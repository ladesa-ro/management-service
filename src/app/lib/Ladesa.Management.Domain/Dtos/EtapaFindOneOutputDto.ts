import { EntityOutputDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/EntityOutputDto";
import type { ScalarDate } from "@/Ladesa.Management.Domain/Abstractions/Scalars";
import { CalendarioLetivoFindOneOutputDto } from "./CalendarioLetivoFindOneOutputDto";

export class EtapaFindOneOutputDto extends EntityOutputDto {
  numero!: number | null;
  dataInicio!: ScalarDate;
  dataTermino!: ScalarDate;
  cor!: string | null;
  calendario!: CalendarioLetivoFindOneOutputDto;
}
