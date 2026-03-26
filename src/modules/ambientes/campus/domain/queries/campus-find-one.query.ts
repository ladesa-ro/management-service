import { FindOneQuery, SharedFields } from "@/domain/abstractions";

export const CampusFindOneQueryFields = {
  id: SharedFields.idUuid,
};

export class CampusFindOneQuery extends FindOneQuery {}
