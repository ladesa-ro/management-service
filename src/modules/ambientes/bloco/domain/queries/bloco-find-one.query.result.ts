import { EntityQueryResult, SharedFields } from "@/domain/abstractions";
import { fieldsToProperties } from "@/infrastructure.database/typeorm/metadata/model-from-fields";
import {
  commonProperties,
  defineModel,
  referenceProperty,
} from "@/infrastructure.database/typeorm/metadata/model-registry";
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

defineModel("BlocoFindOneQueryResult", [
  ...fieldsToProperties(BlocoFindOneQueryResultFields),
  referenceProperty("campus", "CampusFindOneQueryResult"),
  referenceProperty("imagemCapa", "ImagemFindOneQueryResult", { nullable: true }),
  ...commonProperties.dated,
]);
