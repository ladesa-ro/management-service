import { Ambiente } from "../../ambiente/domain/ambiente.domain";
import { CalendarioLetivo } from "../../calendario-letivo/domain/calendario-letivo.domain";
import { Disciplina } from "../../disciplina/domain/disciplina.domain";
import { Imagem } from "../../imagem/domain/imagem.domain";
import { Turma } from "../../turma/domain/turma.domain";

export class Diario {
  id!: string;
  ativo!: boolean;
  calendarioLetivo!: CalendarioLetivo;
  turma!: Turma;
  disciplina!: Disciplina;
  ambientePadrao!: Ambiente | null;
  imagemCapa!: Imagem | null;
  dateCreated!: Date;
  dateUpdated!: Date;
  dateDeleted!: Date | null;
}
