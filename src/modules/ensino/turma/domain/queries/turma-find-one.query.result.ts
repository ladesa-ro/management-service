import { EntityQueryResult, SharedFields } from "@/domain/abstractions";
import { AmbienteFindOneQueryResult } from "@/modules/ambientes/ambiente";
import { ImagemFindOneQueryResult } from "@/modules/armazenamento/imagem";
import { CursoFindOneQueryResult } from "@/modules/ensino/curso";
import { TurmaFields } from "../turma.fields";

export const TurmaFindOneQueryResultFields = {
  id: SharedFields.idUuid,
  ...TurmaFields,
};

export class TurmaFindOneQueryResult extends EntityQueryResult {
  periodo!: string;
  nome!: string | null;
  ambientePadraoAula!: AmbienteFindOneQueryResult | null;
  curso!: CursoFindOneQueryResult;
  imagemCapa!: ImagemFindOneQueryResult | null;
}
