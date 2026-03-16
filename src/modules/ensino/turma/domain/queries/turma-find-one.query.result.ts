import { EntityQueryResult } from "@/domain/abstractions";
import { AmbienteFindOneQueryResult } from "@/modules/ambientes/ambiente";
import { ImagemFindOneQueryResult } from "@/modules/armazenamento/imagem";
import { CursoFindOneQueryResult } from "@/modules/ensino/curso";

export class TurmaFindOneQueryResult extends EntityQueryResult {
  periodo!: string;
  nome!: string | null;
  ambientePadraoAula!: AmbienteFindOneQueryResult | null;
  curso!: CursoFindOneQueryResult;
  imagemCapa!: ImagemFindOneQueryResult | null;
}
