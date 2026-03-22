import { EntityQueryResult, SharedFields } from "@/domain/abstractions";
import { fieldsToProperties } from "@/domain/abstractions/metadata/model-from-fields";
import {
  commonProperties,
  defineModel,
  referenceProperty,
} from "@/domain/abstractions/metadata/model-registry";
import { ImagemFields } from "../imagem.fields";
import { ImagemArquivoFindOneFromImagemQueryResult } from "./imagem-arquivo-from-imagem.query.result";

const { versoes: _versoes, ...imagemScalarFields } = ImagemFields;

export const ImagemFindOneQueryResultFields = {
  id: SharedFields.idUuid,
  ...imagemScalarFields,
};

export class ImagemFindOneQueryResult extends EntityQueryResult {
  descricao!: string | null;
  versoes!: ImagemArquivoFindOneFromImagemQueryResult[];
}

defineModel("ImagemFindOneQueryResult", [
  ...fieldsToProperties(ImagemFindOneQueryResultFields),
  referenceProperty("versoes", "ImagemArquivoFindOneFromImagemQueryResult"),
  ...commonProperties.dated,
]);
