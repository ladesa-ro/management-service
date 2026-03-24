import { EntityQueryResult, SharedFields } from "@/domain/abstractions";
import { CampusFindOneQueryResult } from "@/modules/ambientes/campus";
import { ImagemFindOneQueryResult } from "@/modules/armazenamento/imagem";
import { BlocoFields } from "../bloco.fields";

export const BlocoFindOneQueryResultFields = {
  id: SharedFields.idUuid,
  ...BlocoFields,
};

export class BlocoFindOneQueryResult extends EntityQueryResult {
  nome!: string;
  codigo!: string;
  campus!: CampusFindOneQueryResult;
  imagemCapa!: ImagemFindOneQueryResult | null;
}
