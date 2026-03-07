import { EntityOutputDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/EntityOutputDto";
import { CampusFindOneOutputDto } from "./CampusFindOneOutputDto";
import { ImagemFindOneOutputDto } from "./ImagemFindOneOutputDto";

export class BlocoFindOneOutputDto extends EntityOutputDto {
  nome!: string;
  codigo!: string;
  campus!: CampusFindOneOutputDto;
  imagemCapa!: ImagemFindOneOutputDto | null;
}
