import { EntityQueryResult, SharedFields } from "@/domain/abstractions";
import { fieldsToProperties } from "@/domain/abstractions/metadata/model-from-fields";
import {
  commonProperties,
  defineModel,
  referenceProperty,
} from "@/domain/abstractions/metadata/model-registry";
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

defineModel("DisciplinaFindOneQueryResult", [
  ...fieldsToProperties(DisciplinaFindOneQueryResultFields),
  referenceProperty("imagemCapa", "ImagemFindOneQueryResult", { nullable: true }),
  ...commonProperties.dated,
]);
