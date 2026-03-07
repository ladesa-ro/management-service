import type { ScalarDate } from "@/Ladesa.Management.Domain/Abstractions/Scalars";
import type { DiarioInputRefDto } from "./DiarioInputRefDto";
import type { IntervaloDeTempoInputRefDto } from "./IntervaloDeTempoInputRefDto";

export class DiarioPreferenciaAgrupamentoCreateInputDto {
  dataInicio!: ScalarDate;
  dataFim?: ScalarDate | null;
  diaSemanaIso!: number;
  aulasSeguidas!: number;
  intervaloDeTempo!: IntervaloDeTempoInputRefDto;
  diario!: DiarioInputRefDto;
}
