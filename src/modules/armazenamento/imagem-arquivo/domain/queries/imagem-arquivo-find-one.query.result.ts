import { EntityQueryResult, SharedFields } from "@/domain/abstractions";
import { fieldsToProperties } from "@/domain/abstractions/metadata/model-from-fields";
import { commonProperties, defineModel } from "@/domain/abstractions/metadata/model-registry";
import { ArquivoFindOneQueryResult } from "@/modules/armazenamento/arquivo";
import { ImagemFindOneQueryResult } from "@/modules/armazenamento/imagem";
import { ImagemArquivoFields } from "../imagem-arquivo.fields";

export const ImagemArquivoFindOneQueryResultFields = {
  id: SharedFields.idUuid,
  ...ImagemArquivoFields,
};

export class ImagemArquivoFindOneQueryResult extends EntityQueryResult {
  largura!: number;
  altura!: number;
  formato!: string;
  mimeType!: string;
  imagem!: ImagemFindOneQueryResult;
  arquivo!: ArquivoFindOneQueryResult;
}

defineModel("ImagemArquivoFindOneQueryResult", [
  ...fieldsToProperties(ImagemArquivoFindOneQueryResultFields),
  ...commonProperties.dated,
]);
