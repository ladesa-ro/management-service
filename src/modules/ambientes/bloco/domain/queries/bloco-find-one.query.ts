import { FindOneQuery, SharedFields } from "@/domain/abstractions";
export const BlocoFindOneQueryFields = {
  id: SharedFields.idUuid,
};

export class BlocoFindOneQuery extends FindOneQuery {}
