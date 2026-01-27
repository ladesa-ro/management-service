import { PerfilFindOneOutput } from "../../../perfil/application/dtos";
import { UsuarioFindOneOutput } from "../../../usuario/application/dtos";

// ============================================================================
// Auth Login Input
// ============================================================================

export class AuthLoginInput {
  matriculaSiape!: string;

  senha!: string;
}

// ============================================================================
// Auth Refresh Input
// ============================================================================

export class AuthRefreshInput {
  refreshToken!: string;
}

// ============================================================================
// Auth WhoAmI Output
// ============================================================================

export class AuthWhoAmIOutput {
  usuario!: UsuarioFindOneOutput | null;

  perfisAtivos!: PerfilFindOneOutput[];
}

// ============================================================================
// Auth Session Credentials
// ============================================================================

export class AuthSessionCredentials {
  access_token!: string | null;

  token_type!: string | null;

  id_token!: string | null;

  refresh_token!: string | null;

  expires_in!: number | null;

  expires_at!: number | null;

  session_state!: string | null;

  scope!: string | null;
}

// ============================================================================
// Auth Set Initial Password
// ============================================================================

export class AuthCredentialsSetInitialPasswordInput {
  matriculaSiape!: string;

  senha!: string;
}

// ============================================================================
// Auth Recover Password
// ============================================================================

export class AuthRecoverPasswordInput {
  email!: string;
}
