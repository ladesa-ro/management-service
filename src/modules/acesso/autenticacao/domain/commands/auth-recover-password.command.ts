import { AutenticacaoFields } from "../autenticacao.fields";

export const AuthRecoverPasswordCommandFields = {
  email: AutenticacaoFields.email,
};

export class AuthRecoverPasswordCommand {
  email!: string;
}
