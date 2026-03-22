import { FindOneQuery, SharedFields } from "@/domain/abstractions";

export const OfertaFormacaoNivelFormacaoFindOneQueryFields = {
  id: SharedFields.idUuid,
};

export class OfertaFormacaoNivelFormacaoFindOneQuery extends FindOneQuery {}
