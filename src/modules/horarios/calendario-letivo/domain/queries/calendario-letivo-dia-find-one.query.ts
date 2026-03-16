import { FindOneQuery } from "@/domain/abstractions";

export class CalendarioLetivoDiaFindOneQuery extends FindOneQuery {
  calendarioLetivoId?: string;
  data?: string;
}
