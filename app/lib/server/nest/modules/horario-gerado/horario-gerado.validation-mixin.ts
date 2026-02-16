import { IsDateString, IsOptional, IsString } from "class-validator";
import { decorate } from "ts-mixer";

export class HorarioGeradoFieldsMixin {
  @decorate(IsOptional())
  @decorate(IsString())
  status?: string | null;

  @decorate(IsOptional())
  @decorate(IsString())
  tipo?: string | null;

  @decorate(IsOptional())
  @decorate(IsDateString())
  dataGeracao?: string | Date | null;

  @decorate(IsOptional())
  @decorate(IsDateString())
  vigenciaInicio?: string | Date | null;

  @decorate(IsOptional())
  @decorate(IsDateString())
  vigenciaFim?: string | Date | null;
}
