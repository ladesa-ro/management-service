import { FindOneQuery, SharedFields } from "@/domain/abstractions";
export const ImagemFindOneQueryFields = {
  id: SharedFields.idUuid,
};

export class ImagemFindOneQuery extends FindOneQuery {}
