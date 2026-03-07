import type { CampusInputRefDto } from "./CampusInputRefDto";
import type { ImagemInputRefDto } from "./ImagemInputRefDto";
import type { OfertaFormacaoInputRefDto } from "./OfertaFormacaoInputRefDto";

export class CursoUpdateInputDto {
  nome?: string;
  nomeAbreviado?: string;
  campus?: CampusInputRefDto;
  ofertaFormacao?: OfertaFormacaoInputRefDto;
  imagemCapa?: ImagemInputRefDto | null;
}
