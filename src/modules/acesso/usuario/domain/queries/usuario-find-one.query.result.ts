import { EntityQueryResult, SharedFields } from "@/domain/abstractions";
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
