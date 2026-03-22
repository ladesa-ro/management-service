import { ImagemFields } from "../imagem.fields";

export const ImagemCreateCommandFields = {
  descricao: ImagemFields.descricao,
};

export class ImagemCreateCommand {
  descricao?: string | null;
}
