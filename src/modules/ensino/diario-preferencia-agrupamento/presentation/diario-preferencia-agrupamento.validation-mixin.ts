import { IsDateString, IsInt, IsOptional, Max, Min } from "class-validator";
import { decorate } from "ts-mixer";

export class DiarioPreferenciaAgrupamentoFieldsMixin {
  @decorate(IsDateString())
  dataInicio: string | Date;

  @decorate(IsOptional())
  @decorate(IsDateString())
  dataFim?: string | Date | null;

  @decorate(IsInt())
  @decorate(Min(1))
  @decorate(Max(7))
  diaSemanaIso: number;

  @decorate(IsInt())
  @decorate(Min(1))
  aulasSeguidas: number;
}
