import { EntityOutputDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/EntityOutputDto";
import { BlocoFindOneOutputDto } from "./BlocoFindOneOutputDto";
import { ImagemFindOneOutputDto } from "./ImagemFindOneOutputDto";

export class AmbienteFindOneOutputDto extends EntityOutputDto {
  nome!: string;
  descricao!: string | null;
  codigo!: string;
  capacidade!: number | null;
  tipo!: string | null;
  bloco!: BlocoFindOneOutputDto;
  imagemCapa!: ImagemFindOneOutputDto | null;
}
