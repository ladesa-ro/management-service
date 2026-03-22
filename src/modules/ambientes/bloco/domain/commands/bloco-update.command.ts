import { CampusInputRef } from "@/modules/ambientes/campus";
import { ImagemInputRef } from "@/modules/armazenamento/imagem";
import { BlocoFields } from "../bloco.fields";

export const BlocoUpdateCommandFields = {
  nome: BlocoFields.nome,
  codigo: BlocoFields.codigo,
  campus: BlocoFields.campus,
};

export class BlocoUpdateCommand {
  nome?: string;
  codigo?: string;
  campus?: CampusInputRef;
  imagemCapa?: ImagemInputRef | null;
}
