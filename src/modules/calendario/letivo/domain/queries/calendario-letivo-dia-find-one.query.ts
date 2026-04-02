import { createFieldMetadata, FindOneQuery, SharedFields } from "@/domain/abstractions";

export const CalendarioLetivoDiaFindOneQueryFields = {
  id: SharedFields.idUuid,
  calendarioLetivoId: createFieldMetadata({ description: "ID do calendario letivo (uuid)" }),
  data: createFieldMetadata({ description: "Data do dia no calendario (YYYY-MM-DD)" }),
};

export class CalendarioLetivoDiaFindOneQuery extends FindOneQuery {
  calendarioLetivoId?: string;
  data?: string;
}
