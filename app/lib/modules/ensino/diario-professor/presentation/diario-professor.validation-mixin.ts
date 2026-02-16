import { IsBoolean } from "class-validator";
import { decorate } from "ts-mixer";

export class DiarioProfessorFieldsMixin {
  @decorate(IsBoolean())
  situacao: boolean;
}
