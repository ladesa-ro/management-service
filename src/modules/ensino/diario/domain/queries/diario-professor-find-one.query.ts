import { FindOneQuery, SharedFields } from "@/domain/abstractions";

export const DiarioProfessorFindOneQueryFields = {
  id: SharedFields.idUuid,
};

export class DiarioProfessorFindOneQuery extends FindOneQuery {}
