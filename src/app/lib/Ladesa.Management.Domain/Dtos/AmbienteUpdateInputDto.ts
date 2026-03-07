import type { BlocoInputRefDto } from "./BlocoInputRefDto";
import type { ImagemInputRefDto } from "./ImagemInputRefDto";

export class AmbienteUpdateInputDto {
  nome?: string;
  descricao?: string | null;
  codigo?: string;
  capacidade?: number | null;
  tipo?: string | null;
  bloco?: BlocoInputRefDto;
  imagemCapa?: ImagemInputRefDto | null;
}
