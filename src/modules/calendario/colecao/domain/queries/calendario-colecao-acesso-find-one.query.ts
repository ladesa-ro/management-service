import { FindOneQuery, SharedFields } from "@/domain/abstractions";

export const CalendarioColecaoAcessoFindOneQueryFields = {
  id: SharedFields.idUuid,
};

export class CalendarioColecaoAcessoFindOneQuery extends FindOneQuery {}
