import { FindOneQuery, SharedFields } from "@/domain/abstractions";

export const CalendarioAgendamentoFindOneQueryFields = {
  id: SharedFields.idUuid,
};

export class CalendarioAgendamentoFindOneQuery extends FindOneQuery {}
