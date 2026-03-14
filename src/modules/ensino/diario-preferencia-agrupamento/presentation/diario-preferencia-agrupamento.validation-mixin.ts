import { IsDateString, IsInt, IsOptional, Max, Min } from "@/modules/@shared/presentation/shared";
export class DiarioPreferenciaAgrupamentoFieldsMixin {
  @IsDateString()
  dataInicio: string | Date;

  @IsOptional()
  @IsDateString()
  dataFim?: string | Date | null;

  @IsInt()
  @Min(1)
  @Max(7)
  diaSemanaIso: number;

  @IsInt()
  @Min(1)
  aulasSeguidas: number;
}
