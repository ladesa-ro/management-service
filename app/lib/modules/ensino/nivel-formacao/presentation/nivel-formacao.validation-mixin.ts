import { IsString, MinLength } from "class-validator";
import { decorate } from "ts-mixer";

export class NivelFormacaoFieldsMixin {
  @decorate(IsString())
  @decorate(MinLength(1))
  slug: string;
}
