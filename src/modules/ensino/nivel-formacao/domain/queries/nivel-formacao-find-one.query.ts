import { FindOneQuery, SharedFields } from "@/domain/abstractions";

export const NivelFormacaoFindOneQueryFields = {
  id: SharedFields.idUuid,
};

export class NivelFormacaoFindOneQuery extends FindOneQuery {}
