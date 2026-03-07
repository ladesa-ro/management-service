import type { ImagemInputRefDto } from "./ImagemInputRefDto";

export class DisciplinaUpdateInputDto {
  nome?: string;
  nomeAbreviado?: string;
  cargaHoraria?: number;
  imagemCapa?: ImagemInputRefDto | null;
}
