import { FindOneQuery, SharedFields } from "@/domain/abstractions";

export const CalendarioLetivoFindOneQueryFields = {
  id: SharedFields.idUuid,
};

export class CalendarioLetivoFindOneQuery extends FindOneQuery {}
