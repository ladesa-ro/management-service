import { FindOneQuery, SharedFields } from "@/domain/abstractions";

export const PerfilFindOneQueryFields = {
  id: SharedFields.idUuid,
};

export class PerfilFindOneQuery extends FindOneQuery {}
