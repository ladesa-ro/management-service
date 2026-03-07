import { EntityOutputDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/EntityOutputDto";
import { CampusFindOneOutputDto } from "./CampusFindOneOutputDto";
import { OfertaFormacaoFindOneOutputDto } from "./OfertaFormacaoFindOneOutputDto";

export class GradeHorarioOfertaFormacaoFindOneOutputDto extends EntityOutputDto {
  campus!: CampusFindOneOutputDto;
  ofertaFormacao!: OfertaFormacaoFindOneOutputDto;
}
