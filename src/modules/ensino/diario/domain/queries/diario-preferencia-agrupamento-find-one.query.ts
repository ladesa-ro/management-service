import { FindOneQuery, SharedFields } from "@/domain/abstractions";

export const DiarioPreferenciaAgrupamentoFindOneQueryFields = {
  id: SharedFields.idUuid,
};

export class DiarioPreferenciaAgrupamentoFindOneQuery extends FindOneQuery {}
