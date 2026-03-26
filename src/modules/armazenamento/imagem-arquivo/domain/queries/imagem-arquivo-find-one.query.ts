import { FindOneQuery, SharedFields } from "@/domain/abstractions";

export const ImagemArquivoFindOneQueryFields = {
  id: SharedFields.idUuid,
};

export class ImagemArquivoFindOneQuery extends FindOneQuery {}
