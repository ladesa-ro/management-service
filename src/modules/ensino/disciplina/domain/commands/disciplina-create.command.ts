import { ImagemInputRef } from "@/modules/armazenamento/imagem";

export class DisciplinaCreateCommand {
  nome!: string;
  nomeAbreviado!: string;
  cargaHoraria!: number;
  imagemCapa?: ImagemInputRef | null;
}
