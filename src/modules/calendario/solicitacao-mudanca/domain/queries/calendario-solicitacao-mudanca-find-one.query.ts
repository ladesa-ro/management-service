import { FindOneQuery, SharedFields } from "@/domain/abstractions";

export const CalendarioSolicitacaoMudancaFindOneQueryFields = {
  id: SharedFields.idUuid,
};

export class CalendarioSolicitacaoMudancaFindOneQuery extends FindOneQuery {}
