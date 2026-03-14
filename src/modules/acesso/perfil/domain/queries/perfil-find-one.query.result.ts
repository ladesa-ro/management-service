import { EntityQueryResult } from "@/domain/abstractions";
import { UsuarioFindOneQueryResult } from "@/modules/acesso/usuario";
import { CampusFindOneQueryResult } from "@/modules/ambientes/campus";

export class PerfilFindOneQueryResult extends EntityQueryResult {
  ativo!: boolean;
  cargo!: string;
  campus!: CampusFindOneQueryResult;
  usuario!: UsuarioFindOneQueryResult;
}
