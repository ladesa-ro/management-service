import { ImagemInputRef } from "@/modules/armazenamento/imagem";
import { UsuarioFields } from "../usuario.fields";

export type VinculoInput = {
  campus: { id: string };
  cargo: string;
};

export const UsuarioCreateCommandFields = {
  nome: UsuarioFields.nome,
  matricula: UsuarioFields.matricula,
  email: UsuarioFields.email,
  imagemCapa: UsuarioFields.imagemCapa,
  imagemPerfil: UsuarioFields.imagemPerfil,
  vinculos: UsuarioFields.vinculos,
};

export class UsuarioCreateCommand {
  nome?: string | null;
  matricula?: string | null;
  email?: string | null;
  imagemCapa?: ImagemInputRef | null;
  imagemPerfil?: ImagemInputRef | null;
  vinculos?: VinculoInput[];
}
