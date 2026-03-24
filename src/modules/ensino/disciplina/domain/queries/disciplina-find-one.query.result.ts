import { EntityQueryResult, SharedFields } from "@/domain/abstractions";
import { ImagemFindOneQueryResult } from "@/modules/armazenamento/imagem";
import { DisciplinaFields } from "../disciplina.fields";

export const DisciplinaFindOneQueryResultFields = {
  id: SharedFields.idUuid,
  ...DisciplinaFields,
};

export class DisciplinaFindOneQueryResult extends EntityQueryResult {
  nome!: string;
  nomeAbreviado!: string;
  cargaHoraria!: number;
  imagemCapa!: ImagemFindOneQueryResult | null;
}
