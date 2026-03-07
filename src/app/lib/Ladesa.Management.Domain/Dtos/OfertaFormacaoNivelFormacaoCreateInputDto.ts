import type { NivelFormacaoInputRefDto } from "./NivelFormacaoInputRefDto";
import type { OfertaFormacaoInputRefDto } from "./OfertaFormacaoInputRefDto";

export class OfertaFormacaoNivelFormacaoCreateInputDto {
  nivelFormacao!: NivelFormacaoInputRefDto;
  ofertaFormacao!: OfertaFormacaoInputRefDto;
}
