import { AutenticacaoFields } from "../autenticacao.fields";

export const AuthCredentialsSetInitialPasswordCommandFields = {
  matricula: AutenticacaoFields.matricula,
  senha: AutenticacaoFields.senha,
};

export class AuthCredentialsSetInitialPasswordCommand {
  matricula!: string;
  senha!: string;
}
