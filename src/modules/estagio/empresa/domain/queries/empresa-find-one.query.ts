import { SharedFields } from "@/domain/abstractions";
import { FindOneQuery } from "@/domain/abstractions/queries/find-one.query";
export const EmpresaFindOneQueryFields = {
  id: SharedFields.idUuid,
};

export class EmpresaFindOneQuery extends FindOneQuery {}
