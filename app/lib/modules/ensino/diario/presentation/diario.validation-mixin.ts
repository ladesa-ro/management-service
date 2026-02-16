import { IsBoolean } from "class-validator";
import { decorate } from "ts-mixer";

export class DiarioFieldsMixin {
  @decorate(IsBoolean())
  ativo: boolean;
}
