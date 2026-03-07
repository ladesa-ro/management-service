import { EntityOutputDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/EntityOutputDto";
import type { ScalarDate } from "@/Ladesa.Management.Domain/Abstractions/Scalars";
import { CalendarioLetivoFindOneOutputDto } from "./CalendarioLetivoFindOneOutputDto";

export class HorarioGeradoFindOneOutputDto extends EntityOutputDto {
  status!: string | null;
  tipo!: string | null;
  dataGeracao!: ScalarDate | null;
  vigenciaInicio!: ScalarDate | null;
  vigenciaFim!: ScalarDate | null;
  calendario!: CalendarioLetivoFindOneOutputDto;
}
