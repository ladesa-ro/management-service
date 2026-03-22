import { EntityQueryResult, SharedFields } from "@/domain/abstractions";
import { fieldsToProperties } from "@/domain/abstractions/metadata/model-from-fields";
import {
  commonProperties,
  defineModel,
  referenceProperty,
} from "@/domain/abstractions/metadata/model-registry";
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

defineModel("TurmaFindOneQueryResult", [
  ...fieldsToProperties(TurmaFindOneQueryResultFields),
  referenceProperty("curso", "CursoFindOneQueryResult"),
  referenceProperty("ambientePadraoAula", "AmbienteFindOneQueryResult", { nullable: true }),
  referenceProperty("imagemCapa", "ImagemFindOneQueryResult", { nullable: true }),
  ...commonProperties.dated,
]);
