import { ImagemInputRef } from "@/modules/armazenamento/imagem";
import { UsuarioFields } from "../usuario.fields";
import type { VinculoInput } from "./usuario-create.command";

export const UsuarioUpdateCommandFields = {
  nome: UsuarioFields.nome,
  matricula: UsuarioFields.matricula,
  email: UsuarioFields.email,
  imagemCapa: UsuarioFields.imagemCapa,
  imagemPerfil: UsuarioFields.imagemPerfil,
  vinculos: UsuarioFields.vinculos,
};

export class UsuarioUpdateCommand {
  nome?: string | null;
  matricula?: string | null;
  email?: string | null;
  imagemCapa?: ImagemInputRef | null;
  imagemPerfil?: ImagemInputRef | null;
  vinculos?: VinculoInput[];
}
