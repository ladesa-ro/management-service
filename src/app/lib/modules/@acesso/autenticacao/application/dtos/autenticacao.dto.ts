import { PerfilFindOneOutputDto } from "@/modules/@acesso/perfil";
import { UsuarioFindOneOutputDto } from "@/modules/@acesso/usuario";

// ============================================================================
// Auth Login Input
// ============================================================================

export class AuthLoginInputDto {
  matriculaSiape!: string;

  senha!: string;
}

// ============================================================================
// Auth Refresh Input
// ============================================================================

export class AuthRefreshInputDto {
  refreshToken!: string;
}

// ============================================================================
// Auth WhoAmI Output
// ============================================================================

export class AuthWhoAmIOutputDto {
  usuario!: UsuarioFindOneOutputDto | null;

  perfisAtivos!: PerfilFindOneOutputDto[];
}

// ============================================================================
// Auth Session Credentials
// ============================================================================

export class AuthSessionCredentialsDto {
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

export class AuthCredentialsSetInitialPasswordInputDto {
  matriculaSiape!: string;

  senha!: string;
}

// ============================================================================
// Auth Recover Password
// ============================================================================

export class AuthRecoverPasswordInputDto {
  email!: string;
}
