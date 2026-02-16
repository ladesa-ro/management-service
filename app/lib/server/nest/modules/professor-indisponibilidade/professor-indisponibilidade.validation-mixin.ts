import { IsInt, IsString, Max, Min } from "class-validator";
import { decorate } from "ts-mixer";

export class ProfessorIndisponibilidadeFieldsMixin {
  @decorate(IsInt())
  @decorate(Min(0))
  @decorate(Max(6))
  diaDaSemana: number;

  @decorate(IsString())
  horaInicio: string;

  @decorate(IsString())
  horaFim: string;

  @decorate(IsString())
  motivo: string;
}
