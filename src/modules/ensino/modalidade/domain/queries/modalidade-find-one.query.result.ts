import { EntityQueryResult, SharedFields } from "@/domain/abstractions";
import { ModalidadeFields } from "../modalidade.fields";

export const ModalidadeFindOneQueryResultFields = {
  id: SharedFields.idUuid,
  ...ModalidadeFields,
};

export class ModalidadeFindOneQueryResult extends EntityQueryResult {
  nome!: string;
  slug!: string;
}
