import { EntityOutputDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/EntityOutputDto";
import { CampusFindOneOutputDto } from "./CampusFindOneOutputDto";
import { OfertaFormacaoFindOneOutputDto } from "./OfertaFormacaoFindOneOutputDto";

export class CalendarioLetivoFindOneOutputDto extends EntityOutputDto {
  nome!: string;
  ano!: number;
  campus!: CampusFindOneOutputDto;
  ofertaFormacao!: OfertaFormacaoFindOneOutputDto;
}
