import { FindOneQuery, SharedFields } from "@/domain/abstractions";
export const ModalidadeFindOneQueryFields = {
  id: SharedFields.idUuid,
};

export class ModalidadeFindOneQuery extends FindOneQuery {}
