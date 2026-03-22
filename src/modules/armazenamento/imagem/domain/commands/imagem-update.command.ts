import { ImagemFields } from "../imagem.fields";

export const ImagemUpdateCommandFields = {
  descricao: ImagemFields.descricao,
};

export class ImagemUpdateCommand {
  descricao?: string | null;
}
