import { EntityQueryResult } from "@/domain/abstractions";
import { ImagemFindOneQueryResult } from "@/modules/armazenamento/imagem";

export class DisciplinaFindOneQueryResult extends EntityQueryResult {
  nome!: string;
  nomeAbreviado!: string;
  cargaHoraria!: number;
  imagemCapa!: ImagemFindOneQueryResult | null;
}
