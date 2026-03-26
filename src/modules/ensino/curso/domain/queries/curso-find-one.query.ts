import { FindOneQuery, SharedFields } from "@/domain/abstractions";

export const CursoFindOneQueryFields = {
  id: SharedFields.idUuid,
};

export class CursoFindOneQuery extends FindOneQuery {}
