import { FindOneQuery, SharedFields } from "@/domain/abstractions";
export const UsuarioFindOneQueryFields = {
  id: SharedFields.idUuid,
};

export class UsuarioFindOneQuery extends FindOneQuery {}
