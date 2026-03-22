import { SharedFields } from "@/domain/abstractions";
import { FindOneQuery } from "@/domain/abstractions/queries/find-one.query";
export const EstagiarioFindOneQueryFields = {
  id: SharedFields.idUuid,
};

export class EstagiarioFindOneQuery extends FindOneQuery {}
