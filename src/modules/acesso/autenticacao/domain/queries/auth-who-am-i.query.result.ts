import { UsuarioFindOneQueryResult } from "@/modules/acesso/usuario";
import { PerfilFindOneQueryResult } from "@/modules/acesso/usuario/perfil";
import { AutenticacaoFields } from "../autenticacao.fields";

export const AuthWhoAmIQueryResultFields = {
  usuario: AutenticacaoFields.usuario,
  perfisAtivos: AutenticacaoFields.perfisAtivos,
};

export class AuthWhoAmIQueryResult {
  usuario!: UsuarioFindOneQueryResult | null;
  perfisAtivos!: PerfilFindOneQueryResult[];
}
