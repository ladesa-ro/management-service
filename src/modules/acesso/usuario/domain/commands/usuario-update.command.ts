import { ImagemInputRef } from "@/modules/armazenamento/imagem";

export class UsuarioUpdateCommand {
  nome?: string | null;
  matricula?: string | null;
  email?: string | null;
  imagemCapa?: ImagemInputRef | null;
  imagemPerfil?: ImagemInputRef | null;
}
