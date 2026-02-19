import { IsOptional, IsString, MinLength } from "class-validator";
import { decorate } from "ts-mixer";

export class ReservaFieldsMixin {
  @decorate(IsString())
  @decorate(MinLength(1))
  situacao: string;

  @decorate(IsOptional())
  @decorate(IsString())
  motivo?: string | null;

  @decorate(IsOptional())
  @decorate(IsString())
  tipo?: string | null;

  @decorate(IsString())
  rrule: string;
}
