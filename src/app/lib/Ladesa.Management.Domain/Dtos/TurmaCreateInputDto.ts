import type { AmbienteInputRefDto } from "./AmbienteInputRefDto";
import type { CursoInputRefDto } from "./CursoInputRefDto";
import type { ImagemInputRefDto } from "./ImagemInputRefDto";

export class TurmaCreateInputDto {
  periodo!: string;
  curso!: CursoInputRefDto;
  ambientePadraoAula?: AmbienteInputRefDto | null;
  imagemCapa?: ImagemInputRefDto | null;
}
