import { FindOneQuery, SharedFields } from "@/domain/abstractions";

export const AmbienteFindOneQueryFields = {
  id: SharedFields.idUuid,
};

export class AmbienteFindOneQuery extends FindOneQuery {}
