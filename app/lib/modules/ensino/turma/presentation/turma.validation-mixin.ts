import { IsString, MinLength } from "class-validator";
import { decorate } from "ts-mixer";

export class TurmaFieldsMixin {
  @decorate(IsString())
  @decorate(MinLength(1))
  periodo: string;
}
