import { Type } from "class-transformer";
import { IsArray, IsInt, IsOptional, IsString, ValidateNested } from "class-validator";
import { PerfilFindOneOutput } from "../../../perfil/application/dtos";
import { UsuarioFindOneOutput } from "../../../usuario/application/dtos";

// ============================================================================
// Auth Login Input
// ============================================================================

export class AuthLoginInput {
  @IsString()
  matriculaSiape!: string;

  @IsString()
  senha!: string;
}

// ============================================================================
// Auth Refresh Input
// ============================================================================

export class AuthRefreshInput {
  @IsString()
  refreshToken!: string;
}

// ============================================================================
// Auth WhoAmI Output
// ============================================================================

export class AuthWhoAmIOutput {
  @IsOptional()
  @ValidateNested()
  @Type(() => UsuarioFindOneOutput)
  usuario!: UsuarioFindOneOutput | null;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PerfilFindOneOutput)
  perfisAtivos!: PerfilFindOneOutput[];
}

// ============================================================================
// Auth Session Credentials
// ============================================================================

export class AuthSessionCredentials {
  @IsOptional()
  @IsString()
  access_token!: string | null;

  @IsOptional()
  @IsString()
  token_type!: string | null;

  @IsOptional()
  @IsString()
  id_token!: string | null;

  @IsOptional()
  @IsString()
  refresh_token!: string | null;

  @IsOptional()
  @IsInt()
  expires_in!: number | null;

  @IsOptional()
  @IsInt()
  expires_at!: number | null;

  @IsOptional()
  @IsString()
  session_state!: string | null;

  @IsOptional()
  @IsString()
  scope!: string | null;
}

// ============================================================================
// Auth Set Initial Password
// ============================================================================

export class AuthCredentialsSetInitialPasswordInput {
  @IsString()
  matriculaSiape!: string;

  @IsString()
  senha!: string;
}

// ============================================================================
// Auth Recover Password
// ============================================================================

export class AuthRecoverPasswordInput {
  @IsString()
  email!: string;
}
