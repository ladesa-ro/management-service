using Ladesa.ManagementService.Domain.Generics;

namespace Ladesa.ManagementService.Domain.Contracts;

/** Dados de entrada para refresh de autenticação. */
model AuthRefreshInput {
  /** Token de refresh. */
  refreshToken: string;
}

/** Informações sobre o ator.. */
model AuthWhoAmIOutput {
  /** Usuário autenticado. */
  usuario: UsuarioFindOneOutput | null;

  /** Vínculos do usuário logado. */
  perfisAtivos: PerfilFindOneOutput[];
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
model AuthCredentialsSetInitialPasswordInput {
  /** Matrícula SIAPE. */
  matriculaSiape: string;

  /** Nova senha. */
  senha: string;
}

/** Dados de entrada para autenticação. */
model AuthRecoverPasswordInput {
  /** E-mail. */
  email: string;
}
