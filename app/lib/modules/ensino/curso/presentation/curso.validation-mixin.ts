import { IsString, MinLength } from "class-validator";
import { decorate } from "ts-mixer";

export class CursoFieldsMixin {
  @decorate(IsString())
  @decorate(MinLength(1))
  nome: string;

  @decorate(IsString())
  @decorate(MinLength(1))
  nomeAbreviado: string;
}
