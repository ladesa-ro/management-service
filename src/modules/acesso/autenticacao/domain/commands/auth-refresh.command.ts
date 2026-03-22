import { AutenticacaoFields } from "../autenticacao.fields";

export const AuthRefreshCommandFields = {
  refreshToken: AutenticacaoFields.refreshToken,
};

export class AuthRefreshCommand {
  refreshToken!: string;
}
