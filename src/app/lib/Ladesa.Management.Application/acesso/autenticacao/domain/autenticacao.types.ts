/**
 * Tipos do domínio de Autenticação
 * Define conceitos relacionados à autenticação de usuários
 */

/**
 * Credenciais de sessão do usuário autenticado
 */
export interface IAuthSessionCredentials {
  accessToken: string | null;
  tokenType: string | null;
  idToken: string | null;
  refreshToken: string | null;
  expiresIn: number | null;
  expiresAt: number | null;
  sessionState: string | null;
  scope: string | null;
}

/**
 * Dados para login
 */
export interface IAuthLoginInput {
  matriculaSiape: string;
  senha: string;
}

/**
 * Dados para refresh de token
 */
export interface IAuthRefreshInput {
  refreshToken: string;
}

/**
 * Dados para definir senha inicial
 */
export interface IAuthSetInitialPasswordInput {
  matriculaSiape: string;
  senha: string;
}

/**
 * Dados para recuperação de senha
 */
export interface IAuthRecoverPasswordInput {
  email: string;
}
