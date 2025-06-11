using Ladesa.Domain.v4.Generics;
using Ladesa.Domain.v4.Generics.Entities;

namespace Ladesa.Domain.v4.Schemas;

/** Dados de entrada para refresh de autenticação. */
model AuthRefreshInputView {
  /** Token de refresh. */
  refreshToken: string;
}

/** Informações sobre o ator.. */
model AuthWhoAmIResultView {
  /** Usuário autenticado. */
  usuario: UsuarioFindOneResultView | null;

  /** Vínculos do usuário logado. */
  perfisAtivos: PerfilFindOneResultView[];
}

/** Credenciais de sessão. */
model AuthSessionCredentialsView {
  /** Token de acesso. */
  access_token: string | null;

  /** Tipo do token. */
  token_type: string | null;

  /** Token de identificação. */
  id_token: string | null;

  /** Token de refresh. */
  refresh_token: string | null;

  /** Tempo de expiração do token. */
  expires_in: integer | null;

  /** Tempo de expiração do token. */
  expires_at: integer | null;

  /** Estado da sessão. */
  session_state: string | null;

  /** Escopo da autenticação. */
  scope: string | null;
}

/** Dados de entrada para definir a senha inicial. */
model AuthCredentialsSetInitialPasswordInputView {
  /** Matrícula SIAPE. */
  matriculaSiape: string;

  /** Nova senha. */
  senha: string;
}

/** Dados de entrada para autenticação. */
model AuthRecoverPasswordInputView {
  /** E-mail. */
  email: string;
}
