import type { CampusInputRefDto } from "./CampusInputRefDto";
import type { ImagemInputRefDto } from "./ImagemInputRefDto";

export class BlocoCreateInputDto {
  nome!: string;
  codigo!: string;
  campus!: CampusInputRefDto;
  imagemCapa?: ImagemInputRefDto | null;
}
