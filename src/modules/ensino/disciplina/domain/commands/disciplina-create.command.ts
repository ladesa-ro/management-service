import { ImagemInputRef } from "@/modules/armazenamento/imagem";
import { DisciplinaFields } from "../disciplina.fields";

export const DisciplinaCreateCommandFields = {
  nome: DisciplinaFields.nome,
  nomeAbreviado: DisciplinaFields.nomeAbreviado,
  cargaHoraria: DisciplinaFields.cargaHoraria,
};

export class DisciplinaCreateCommand {
  nome!: string;
  nomeAbreviado!: string;
  cargaHoraria!: number;
  imagemCapa?: ImagemInputRef | null;
}
