import { Imagem } from "../../imagem/domain/imagem.domain";

export class Usuario {
  id!: string;
  nome!: string | null;
  matriculaSiape!: string | null;
  email!: string | null;
  isSuperUser!: boolean;
  imagemCapa!: Imagem | null;
  imagemPerfil!: Imagem | null;
  dateCreated!: Date;
  dateUpdated!: Date;
  dateDeleted!: Date | null;
}
