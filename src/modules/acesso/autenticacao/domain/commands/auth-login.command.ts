import { AutenticacaoFields } from "../autenticacao.fields";

export const AuthLoginCommandFields = {
  matricula: AutenticacaoFields.matricula,
  senha: AutenticacaoFields.senha,
};

export class AuthLoginCommand {
  matricula!: string;
  senha!: string;
}
