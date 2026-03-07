import type { CampusInputRefDto } from "./CampusInputRefDto";
import type { OfertaFormacaoInputRefDto } from "./OfertaFormacaoInputRefDto";

export class CalendarioLetivoUpdateInputDto {
  nome?: string;
  ano?: number;
  campus?: CampusInputRefDto;
  ofertaFormacao?: OfertaFormacaoInputRefDto;
}
