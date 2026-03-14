import { EntityQueryResult } from "@/domain/abstractions";
import { CampusFindOneQueryResult } from "@/modules/ambientes/campus";
import { ImagemFindOneQueryResult } from "@/modules/armazenamento/imagem";
import { OfertaFormacaoFindOneQueryResult } from "@/modules/ensino/oferta-formacao";

export class CursoFindOneQueryResult extends EntityQueryResult {
  nome!: string;
  nomeAbreviado!: string;
  campus!: CampusFindOneQueryResult;
  ofertaFormacao!: OfertaFormacaoFindOneQueryResult;
  imagemCapa!: ImagemFindOneQueryResult | null;
}
