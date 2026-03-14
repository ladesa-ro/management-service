import { PerfilFindOneQueryResult } from "@/modules/acesso/perfil";
import { UsuarioFindOneQueryResult } from "@/modules/acesso/usuario";

export class AuthWhoAmIQueryResult {
  usuario!: UsuarioFindOneQueryResult | null;
  perfisAtivos!: PerfilFindOneQueryResult[];
}
