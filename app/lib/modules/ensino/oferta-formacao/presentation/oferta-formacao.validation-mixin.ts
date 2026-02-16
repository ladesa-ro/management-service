import { IsString, MinLength } from "class-validator";
import { decorate } from "ts-mixer";

export class OfertaFormacaoFieldsMixin {
  @decorate(IsString())
  @decorate(MinLength(1))
  nome: string;

  @decorate(IsString())
  @decorate(MinLength(1))
  slug: string;
}
