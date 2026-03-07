import { EntityOutputDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/EntityOutputDto";
import { ImagemFindOneOutputDto } from "./ImagemFindOneOutputDto";

export class DisciplinaFindOneOutputDto extends EntityOutputDto {
  nome!: string;
  nomeAbreviado!: string;
  cargaHoraria!: number;
  imagemCapa!: ImagemFindOneOutputDto | null;
}
