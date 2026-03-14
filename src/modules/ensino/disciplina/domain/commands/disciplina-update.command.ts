import { ImagemInputRef } from "@/modules/armazenamento/imagem";

export class DisciplinaUpdateCommand {
  nome?: string;
  nomeAbreviado?: string;
  cargaHoraria?: number;
  imagemCapa?: ImagemInputRef | null;
}
