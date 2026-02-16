import { IsDateString, IsOptional } from "class-validator";
import { decorate } from "ts-mixer";

export class DisponibilidadeFieldsMixin {
  @decorate(IsDateString())
  dataInicio: Date;

  @decorate(IsOptional())
  @decorate(IsDateString())
  dataFim?: Date | null;
}
