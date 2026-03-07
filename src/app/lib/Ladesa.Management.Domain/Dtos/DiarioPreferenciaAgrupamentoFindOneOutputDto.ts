import { EntityOutputDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/EntityOutputDto";
import type { ScalarDate } from "@/Ladesa.Management.Domain/Abstractions/Scalars";
import { DiarioFindOneOutputDto } from "./DiarioFindOneOutputDto";
import { IntervaloDeTempoFindOneOutputDto } from "./IntervaloDeTempoFindOneOutputDto";

export class DiarioPreferenciaAgrupamentoFindOneOutputDto extends EntityOutputDto {
  dataInicio!: ScalarDate;
  dataFim!: ScalarDate | null;
  diaSemanaIso!: number;
  aulasSeguidas!: number;
  intervaloDeTempo!: IntervaloDeTempoFindOneOutputDto;
  diario!: DiarioFindOneOutputDto;
}
