import { EntityQueryResult, SharedFields } from "@/domain/abstractions";
import { UsuarioFindOneQueryResult } from "@/modules/acesso/usuario";
import { CampusFindOneQueryResult } from "@/modules/ambientes/campus";
import { PerfilFields } from "../perfil.fields";
import { CargoNestedQueryResult } from "./cargo-nested.query.result";

export const PerfilFindOneQueryResultFields = {
  id: SharedFields.idUuid,
  ...PerfilFields,
};

export class PerfilFindOneQueryResult extends EntityQueryResult {
  ativo!: boolean;
  cargo!: CargoNestedQueryResult | null;
  campus!: CampusFindOneQueryResult;
  usuario!: UsuarioFindOneQueryResult;
}
