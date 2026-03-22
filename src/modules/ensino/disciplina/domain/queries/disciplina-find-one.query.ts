import { FindOneQuery, SharedFields } from "@/domain/abstractions";
export const DisciplinaFindOneQueryFields = {
  id: SharedFields.idUuid,
};

export class DisciplinaFindOneQuery extends FindOneQuery {}
