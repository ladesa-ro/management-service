import { FindOneQuery, SharedFields } from "@/domain/abstractions";
export const DiarioFindOneQueryFields = {
  id: SharedFields.idUuid,
};

export class DiarioFindOneQuery extends FindOneQuery {}
