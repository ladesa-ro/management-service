import { EntityQueryResult, SharedFields } from "@/domain/abstractions";
import { ImagemFindOneQueryResult } from "@/modules/armazenamento/imagem";
import { ModalidadeFields } from "../modalidade.fields";

export const ModalidadeFindOneQueryResultFields = {
  id: SharedFields.idUuid,
  ...ModalidadeFields,
};

export class ModalidadeFindOneQueryResult extends EntityQueryResult {
  nome!: string;
  slug!: string;
  imagemCapa!: ImagemFindOneQueryResult | null;
}
