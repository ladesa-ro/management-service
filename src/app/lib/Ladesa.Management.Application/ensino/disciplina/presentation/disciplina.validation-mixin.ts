import { IsInt, IsString, Min, MinLength } from "class-validator";
import { decorate } from "ts-mixer";

export class DisciplinaFieldsMixin {
  @decorate(IsString())
  @decorate(MinLength(1))
  nome: string;

  @decorate(IsString())
  @decorate(MinLength(1))
  nomeAbreviado: string;

  @decorate(IsInt())
  @decorate(Min(1))
  cargaHoraria: number;
}
