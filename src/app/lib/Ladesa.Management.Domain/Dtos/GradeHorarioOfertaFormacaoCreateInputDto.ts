import type { CampusInputRefDto } from "./CampusInputRefDto";
import type { OfertaFormacaoInputRefDto } from "./OfertaFormacaoInputRefDto";

export class GradeHorarioOfertaFormacaoCreateInputDto {
  campus!: CampusInputRefDto;
  ofertaFormacao!: OfertaFormacaoInputRefDto;
}
