import { EntityOutputDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/EntityOutputDto";
import { AmbienteFindOneOutputDto } from "./AmbienteFindOneOutputDto";
import { CursoFindOneOutputDto } from "./CursoFindOneOutputDto";
import { ImagemFindOneOutputDto } from "./ImagemFindOneOutputDto";

export class TurmaFindOneOutputDto extends EntityOutputDto {
  periodo!: string;
  ambientePadraoAula!: AmbienteFindOneOutputDto | null;
  curso!: CursoFindOneOutputDto;
  imagemCapa!: ImagemFindOneOutputDto | null;
}
