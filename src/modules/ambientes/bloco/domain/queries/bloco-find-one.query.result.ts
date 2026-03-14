import { EntityQueryResult } from "@/domain/abstractions";
import { CampusFindOneQueryResult } from "@/modules/ambientes/campus";
import { ImagemFindOneQueryResult } from "@/modules/armazenamento/imagem";

export class BlocoFindOneQueryResult extends EntityQueryResult {
  nome!: string;
  codigo!: string;
  campus!: CampusFindOneQueryResult;
  imagemCapa!: ImagemFindOneQueryResult | null;
}
