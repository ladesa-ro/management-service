import { FindOneQuery, SharedFields } from "@/domain/abstractions";
export const ArquivoFindOneQueryFields = {
  id: SharedFields.idUuid,
};

export class ArquivoFindOneQuery extends FindOneQuery {}
