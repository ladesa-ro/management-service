import { EntityOutputDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/EntityOutputDto";
import { NivelFormacaoFindOneOutputDto } from "./NivelFormacaoFindOneOutputDto";
import { OfertaFormacaoFindOneOutputDto } from "./OfertaFormacaoFindOneOutputDto";

export class OfertaFormacaoNivelFormacaoFindOneOutputDto extends EntityOutputDto {
  nivelFormacao!: NivelFormacaoFindOneOutputDto;
  ofertaFormacao!: OfertaFormacaoFindOneOutputDto;
}
