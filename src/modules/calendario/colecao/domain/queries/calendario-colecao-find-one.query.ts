import { FindOneQuery, SharedFields } from "@/domain/abstractions";

export const CalendarioColecaoFindOneQueryFields = {
  id: SharedFields.idUuid,
};

export class CalendarioColecaoFindOneQuery extends FindOneQuery {}
