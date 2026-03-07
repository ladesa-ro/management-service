import type { ImagemInputRefDto } from "./ImagemInputRefDto";

export class UsuarioCreateInputDto {
  nome?: string | null;
  matriculaSiape?: string | null;
  email?: string | null;
  imagemCapa?: ImagemInputRefDto | null;
  imagemPerfil?: ImagemInputRefDto | null;
}
