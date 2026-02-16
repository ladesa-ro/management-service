import { IsDateString, IsOptional, IsString, MinLength } from "class-validator";
import { decorate } from "ts-mixer";

export class AulaFieldsMixin {
  @decorate(IsDateString())
  data: string;

  @decorate(IsOptional())
  @decorate(IsString())
  @decorate(MinLength(1))
  modalidade?: string | null;
}
