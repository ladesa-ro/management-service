import { FindOneQuery, SharedFields } from "@/domain/abstractions";

export const TurmaMatriculaFindOneQueryFields = {
  id: SharedFields.idUuid,
};

export class TurmaMatriculaFindOneQuery extends FindOneQuery {}
