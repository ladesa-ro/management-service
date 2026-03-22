import { ImagemInputRef } from "@/modules/armazenamento/imagem";
import { DisciplinaFields } from "../disciplina.fields";

export const DisciplinaUpdateCommandFields = {
  nome: DisciplinaFields.nome,
  nomeAbreviado: DisciplinaFields.nomeAbreviado,
  cargaHoraria: DisciplinaFields.cargaHoraria,
};

export class DisciplinaUpdateCommand {
  nome?: string;
  nomeAbreviado?: string;
  cargaHoraria?: number;
  imagemCapa?: ImagemInputRef | null;
}
