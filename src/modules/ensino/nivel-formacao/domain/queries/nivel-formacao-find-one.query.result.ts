import { EntityQueryResult, SharedFields } from "@/domain/abstractions";
import { NivelFormacaoFields } from "../nivel-formacao.fields";

export const NivelFormacaoFindOneQueryResultFields = {
  id: SharedFields.idUuid,
  ...NivelFormacaoFields,
};

export class NivelFormacaoFindOneQueryResult extends EntityQueryResult {
  slug!: string;
}
