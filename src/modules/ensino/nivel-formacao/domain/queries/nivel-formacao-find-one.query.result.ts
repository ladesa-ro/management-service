import { EntityQueryResult, SharedFields } from "@/domain/abstractions";
import { ImagemFindOneQueryResult } from "@/modules/armazenamento/imagem";
import { NivelFormacaoFields } from "../nivel-formacao.fields";

export const NivelFormacaoFindOneQueryResultFields = {
  id: SharedFields.idUuid,
  ...NivelFormacaoFields,
};

export class NivelFormacaoFindOneQueryResult extends EntityQueryResult {
  nome!: string;
  slug!: string;
  imagemCapa!: ImagemFindOneQueryResult | null;
}
