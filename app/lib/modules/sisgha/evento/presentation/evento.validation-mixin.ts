import { IsDateString, IsOptional, IsString } from "class-validator";
import { decorate } from "ts-mixer";

export class EventoFieldsMixin {
  @decorate(IsOptional())
  @decorate(IsString())
  nome?: string | null;

  @decorate(IsString())
  rrule: string;

  @decorate(IsOptional())
  @decorate(IsString())
  cor?: string | null;

  @decorate(IsOptional())
  @decorate(IsDateString())
  dataInicio?: string | null;

  @decorate(IsOptional())
  @decorate(IsDateString())
  dataFim?: string | null;
}
