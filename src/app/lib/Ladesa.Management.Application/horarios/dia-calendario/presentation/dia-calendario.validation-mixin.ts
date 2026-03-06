import { IsBoolean, IsDateString, IsOptional, IsString } from "class-validator";
import { decorate } from "ts-mixer";

export class DiaCalendarioFieldsMixin {
  @decorate(IsDateString())
  data: string;

  @decorate(IsBoolean())
  diaLetivo: boolean;

  @decorate(IsBoolean())
  diaPresencial: boolean;

  @decorate(IsOptional())
  @decorate(IsString())
  feriado?: string | null;

  @decorate(IsString())
  tipo: string;

  @decorate(IsBoolean())
  extraCurricular: boolean;
}
