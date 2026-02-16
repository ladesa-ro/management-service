import { IsDateString } from "class-validator";
import { decorate } from "ts-mixer";

export class HorarioGeradoAulaFieldsMixin {
  @decorate(IsDateString())
  data: Date;
}
