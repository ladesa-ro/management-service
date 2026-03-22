import { AmbienteInputRef } from "@/modules/ambientes/ambiente";
import { ImagemInputRef } from "@/modules/armazenamento/imagem";
import { CursoInputRef } from "@/modules/ensino/curso";
import { TurmaFields } from "../turma.fields";

export const TurmaCreateCommandFields = {
  periodo: TurmaFields.periodo,
  nome: TurmaFields.nome,
  curso: TurmaFields.curso,
  ambientePadraoAula: TurmaFields.ambientePadraoAula,
  imagemCapa: TurmaFields.imagemCapa,
};

export class TurmaCreateCommand {
  periodo!: string;
  nome?: string | null;
  curso!: CursoInputRef;
  ambientePadraoAula?: AmbienteInputRef | null;
  imagemCapa?: ImagemInputRef | null;
}
