import { EntityOutputDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/EntityOutputDto";
import { CampusFindOneOutputDto } from "./CampusFindOneOutputDto";
import { ImagemFindOneOutputDto } from "./ImagemFindOneOutputDto";
import { OfertaFormacaoFindOneOutputDto } from "./OfertaFormacaoFindOneOutputDto";

export class CursoFindOneOutputDto extends EntityOutputDto {
  nome!: string;
  nomeAbreviado!: string;
  campus!: CampusFindOneOutputDto;
  ofertaFormacao!: OfertaFormacaoFindOneOutputDto;
  imagemCapa!: ImagemFindOneOutputDto | null;
}
