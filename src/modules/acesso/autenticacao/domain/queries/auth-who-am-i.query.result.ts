import { PerfilFindOneQueryResult } from "@/modules/acesso/perfil";
import { UsuarioFindOneQueryResult } from "@/modules/acesso/usuario";
import { AutenticacaoFields } from "../autenticacao.fields";

export const AuthWhoAmIQueryResultFields = {
  usuario: AutenticacaoFields.usuario,
  perfisAtivos: AutenticacaoFields.perfisAtivos,
};

export class AuthWhoAmIQueryResult {
  usuario!: UsuarioFindOneQueryResult | null;
  perfisAtivos!: PerfilFindOneQueryResult[];
}
