import { EntityQueryResult } from "@/domain/abstractions";
import { BlocoFindOneQueryResult } from "@/modules/ambientes/bloco";
import { ImagemFindOneQueryResult } from "@/modules/armazenamento/imagem";

export class AmbienteFindOneQueryResult extends EntityQueryResult {
  nome!: string;
  descricao!: string | null;
  codigo!: string;
  capacidade!: number | null;
  tipo!: string | null;
  bloco!: BlocoFindOneQueryResult;
  imagemCapa!: ImagemFindOneQueryResult | null;
}
