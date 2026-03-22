import { FindOneQuery, SharedFields } from "@/domain/abstractions";
export const TurmaFindOneQueryFields = {
  id: SharedFields.idUuid,
};

export class TurmaFindOneQuery extends FindOneQuery {}
