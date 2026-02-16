import { IsDateString, IsInt, IsOptional, IsString, Max, Min } from "class-validator";
import { decorate } from "ts-mixer";

export class EtapaFieldsMixin {
  @decorate(IsOptional())
  @decorate(IsInt())
  @decorate(Min(0))
  @decorate(Max(255))
  numero?: number | null;

  @decorate(IsDateString())
  dataInicio: string;

  @decorate(IsDateString())
  dataTermino: string;

  @decorate(IsOptional())
  @decorate(IsString())
  cor?: string | null;
}
