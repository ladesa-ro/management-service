import { CampusInputRef } from "@/modules/ambientes/campus";
import { ImagemInputRef } from "@/modules/armazenamento/imagem";

export class BlocoUpdateCommand {
  nome?: string;
  codigo?: string;
  campus?: CampusInputRef;
  imagemCapa?: ImagemInputRef | null;
}
