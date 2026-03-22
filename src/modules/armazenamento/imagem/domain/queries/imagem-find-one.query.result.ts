import { EntityQueryResult, SharedFields } from "@/domain/abstractions";
import { fieldsToProperties } from "@/infrastructure.database/typeorm/metadata/model-from-fields";
import {
  commonProperties,
  defineModel,
} from "@/infrastructure.database/typeorm/metadata/model-registry";
import { ImagemFields } from "../imagem.fields";
import { ImagemArquivoFindOneFromImagemQueryResult } from "./imagem-arquivo-from-imagem.query.result";

export const ImagemFindOneQueryResultFields = {
  id: SharedFields.idUuid,
  ...ImagemFields,
};

export class ImagemFindOneQueryResult extends EntityQueryResult {
  descricao!: string | null;
  versoes!: ImagemArquivoFindOneFromImagemQueryResult[];
}

defineModel("ImagemFindOneQueryResult", [
  ...fieldsToProperties(ImagemFindOneQueryResultFields),
  // Note: 'versoes' is a OneToMany relation - not loaded via QbEfficientLoad
  ...commonProperties.dated,
]);
