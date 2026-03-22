import {
  commonProperties,
  defineModel,
  referenceProperty,
  simpleProperty,
} from "@/domain/abstractions/metadata/model-registry";
import { ArquivoFindOneQueryResult } from "@/modules/armazenamento/arquivo";

export class ImagemArquivoFindOneFromImagemQueryResult {
  id!: string;
  largura!: number | null;
  altura!: number | null;
  formato!: string | null;
  mimeType!: string | null;
  arquivo!: ArquivoFindOneQueryResult;
}

defineModel("ImagemArquivoFindOneFromImagemQueryResult", [
  simpleProperty("id"),
  simpleProperty("largura"),
  simpleProperty("altura"),
  simpleProperty("formato"),
  simpleProperty("mimeType"),
  referenceProperty("arquivo", "ArquivoFindOneQueryResult"),
  ...commonProperties.dated,
]);
