import { EntityQueryResult, SharedFields } from "@/domain/abstractions";
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
