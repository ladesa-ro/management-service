import { EntityQueryResult, SharedFields } from "@/domain/abstractions";
import { UsuarioFindOneQueryResult } from "@/modules/acesso/usuario";
import { CampusFindOneQueryResult } from "@/modules/ambientes/campus";
import { PerfilFields } from "../perfil.fields";

export const PerfilFindOneQueryResultFields = {
  id: SharedFields.idUuid,
  ...PerfilFields,
};

export class PerfilFindOneQueryResult extends EntityQueryResult {
  ativo!: boolean;
  cargo!: string;
  campus!: CampusFindOneQueryResult;
  usuario!: UsuarioFindOneQueryResult;
}
