import { Ambiente } from "../../ambiente/domain/ambiente.domain";
import { Curso } from "../../curso/domain/curso.domain";
import { Imagem } from "../../imagem/domain/imagem.domain";

export class Turma {
  id!: string;
  periodo!: string;
  ambientePadraoAula!: Ambiente | null;
  curso!: Curso;
  imagemCapa!: Imagem | null;
  dateCreated!: Date;
  dateUpdated!: Date;
  dateDeleted!: Date | null;
}
