import { EntityQueryResult, SharedFields } from "@/domain/abstractions";
import { fieldsToProperties } from "@/domain/abstractions/metadata/model-from-fields";
import {
  commonProperties,
  defineModel,
  referenceProperty,
} from "@/domain/abstractions/metadata/model-registry";
import { ImagemFindOneQueryResult } from "@/modules/armazenamento/imagem";
import { UsuarioFields } from "../usuario.fields";

export const UsuarioFindOneQueryResultFields = {
  id: SharedFields.idUuid,
  ...UsuarioFields,
};

export class UsuarioFindOneQueryResult extends EntityQueryResult {
  nome!: string | null;
  matricula!: string | null;
  email!: string | null;
  isSuperUser!: boolean;
  imagemCapa!: ImagemFindOneQueryResult | null;
  imagemPerfil!: ImagemFindOneQueryResult | null;
}

defineModel("UsuarioFindOneQueryResult", [
  ...fieldsToProperties(UsuarioFindOneQueryResultFields),
  referenceProperty("imagemCapa", "ImagemFindOneQueryResult", { nullable: true }),
  referenceProperty("imagemPerfil", "ImagemFindOneQueryResult", { nullable: true }),
  ...commonProperties.dated,
]);
