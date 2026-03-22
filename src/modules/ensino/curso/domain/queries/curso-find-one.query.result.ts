import { EntityQueryResult, SharedFields } from "@/domain/abstractions";
import { fieldsToProperties } from "@/infrastructure.database/typeorm/metadata/model-from-fields";
import {
  commonProperties,
  defineModel,
  referenceProperty,
} from "@/infrastructure.database/typeorm/metadata/model-registry";
import { CampusFindOneQueryResult } from "@/modules/ambientes/campus";
import { ImagemFindOneQueryResult } from "@/modules/armazenamento/imagem";
import { OfertaFormacaoFindOneQueryResult } from "@/modules/ensino/oferta-formacao";
import { CursoFields } from "../curso.fields";

export const CursoFindOneQueryResultFields = {
  id: SharedFields.idUuid,
  ...CursoFields,
};

export class CursoFindOneQueryResult extends EntityQueryResult {
  nome!: string;
  nomeAbreviado!: string;
  campus!: CampusFindOneQueryResult;
  ofertaFormacao!: OfertaFormacaoFindOneQueryResult;
  imagemCapa!: ImagemFindOneQueryResult | null;
}

defineModel("CursoFindOneQueryResult", [
  ...fieldsToProperties(CursoFindOneQueryResultFields),
  referenceProperty("campus", "CampusFindOneQueryResult"),
  referenceProperty("ofertaFormacao", "OfertaFormacaoFindOneQueryResult"),
  referenceProperty("imagemCapa", "ImagemFindOneQueryResult", { nullable: true }),
  ...commonProperties.dated,
]);
