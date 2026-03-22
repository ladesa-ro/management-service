import { ImagemInputRef } from "@/modules/armazenamento/imagem";
import { UsuarioFields } from "../usuario.fields";

export const UsuarioCreateCommandFields = {
  nome: UsuarioFields.nome,
  matricula: UsuarioFields.matricula,
  email: UsuarioFields.email,
  imagemCapa: UsuarioFields.imagemCapa,
  imagemPerfil: UsuarioFields.imagemPerfil,
};

export class UsuarioCreateCommand {
  nome?: string | null;
  matricula?: string | null;
  email?: string | null;
  imagemCapa?: ImagemInputRef | null;
  imagemPerfil?: ImagemInputRef | null;
}
