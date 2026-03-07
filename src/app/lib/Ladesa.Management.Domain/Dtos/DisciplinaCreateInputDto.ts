import type { ImagemInputRefDto } from "./ImagemInputRefDto";

export class DisciplinaCreateInputDto {
  nome!: string;
  nomeAbreviado!: string;
  cargaHoraria!: number;
  imagemCapa?: ImagemInputRefDto | null;
}
