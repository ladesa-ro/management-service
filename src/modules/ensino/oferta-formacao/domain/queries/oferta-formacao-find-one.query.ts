import { FindOneQuery, SharedFields } from "@/domain/abstractions";

export const OfertaFormacaoFindOneQueryFields = {
  id: SharedFields.idUuid,
};

export class OfertaFormacaoFindOneQuery extends FindOneQuery {}
