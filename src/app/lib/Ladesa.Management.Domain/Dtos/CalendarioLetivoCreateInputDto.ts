import type { CampusInputRefDto } from "./CampusInputRefDto";
import type { OfertaFormacaoInputRefDto } from "./OfertaFormacaoInputRefDto";

export class CalendarioLetivoCreateInputDto {
  nome!: string;
  ano!: number;
  campus!: CampusInputRefDto;
  ofertaFormacao!: OfertaFormacaoInputRefDto;
}
