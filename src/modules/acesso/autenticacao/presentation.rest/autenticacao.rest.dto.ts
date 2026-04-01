import { AutenticacaoFields } from "@/modules/acesso/autenticacao/domain/autenticacao.fields";
import { AuthCredentialsSetInitialPasswordCommandFields } from "@/modules/acesso/autenticacao/domain/commands/auth-credentials-set-initial-password.command";
import { AuthLoginCommandFields } from "@/modules/acesso/autenticacao/domain/commands/auth-login.command";
import { AuthRecoverPasswordCommandFields } from "@/modules/acesso/autenticacao/domain/commands/auth-recover-password.command";
import { AuthRefreshCommandFields } from "@/modules/acesso/autenticacao/domain/commands/auth-refresh.command";
import { AuthWhoAmIQueryResultFields } from "@/modules/acesso/autenticacao/domain/queries/auth-who-am-i.query.result";
import { PerfilFindOneOutputRestDto } from "@/modules/acesso/usuario/perfil/presentation.rest";
import { UsuarioFindOneOutputRestDto } from "@/modules/acesso/usuario/presentation.rest";
import { ApiProperty, ApiPropertyOptional, ApiSchema } from "@/shared/presentation/rest";

// ============================================================================
// Auth Login Input
// ============================================================================

@ApiSchema({ name: "AuthLoginInputDto" })
export class AuthLoginInputRestDto {
  @ApiProperty(AuthLoginCommandFields.matricula.swaggerMetadata)
  matricula: string;

  @ApiProperty(AuthLoginCommandFields.senha.swaggerMetadata)
  senha: string;
}

// ============================================================================
// Auth Refresh Input
// ============================================================================

@ApiSchema({ name: "AuthRefreshInputDto" })
export class AuthRefreshInputRestDto {
  @ApiProperty(AuthRefreshCommandFields.refreshToken.swaggerMetadata)
  refreshToken: string;
}

// ============================================================================
// Auth WhoAmI Output
// ============================================================================

@ApiSchema({ name: "AuthWhoAmIOutputDto" })
export class AuthWhoAmIOutputRestDto {
  @ApiPropertyOptional({
    ...AuthWhoAmIQueryResultFields.usuario.swaggerMetadata,
    type: () => UsuarioFindOneOutputRestDto,
  })
  usuario: UsuarioFindOneOutputRestDto | null;

  @ApiProperty({
    ...AuthWhoAmIQueryResultFields.perfisAtivos.swaggerMetadata,
    type: () => [PerfilFindOneOutputRestDto],
  })
  perfisAtivos: PerfilFindOneOutputRestDto[];
}

// ============================================================================
// Auth Session Credentials
// ============================================================================

@ApiSchema({ name: "AuthSessionCredentialsDto" })
export class AuthSessionCredentialsRestDto {
  @ApiPropertyOptional(AutenticacaoFields.accessToken.swaggerMetadata)
  access_token: string | null;

  @ApiPropertyOptional(AutenticacaoFields.tokenType.swaggerMetadata)
  token_type: string | null;

  @ApiPropertyOptional(AutenticacaoFields.idToken.swaggerMetadata)
  id_token: string | null;

  @ApiPropertyOptional(AutenticacaoFields.refreshToken.swaggerMetadata)
  refresh_token: string | null;

  @ApiPropertyOptional(AutenticacaoFields.expiresIn.swaggerMetadata)
  expires_in: number | null;

  @ApiPropertyOptional(AutenticacaoFields.expiresAt.swaggerMetadata)
  expires_at: number | null;

  @ApiPropertyOptional(AutenticacaoFields.sessionState.swaggerMetadata)
  session_state: string | null;

  @ApiPropertyOptional(AutenticacaoFields.scope.swaggerMetadata)
  scope: string | null;
}

// ============================================================================
// Auth Set Initial Password
// ============================================================================

@ApiSchema({ name: "AuthCredentialsSetInitialPasswordInputDto" })
export class AuthCredentialsSetInitialPasswordInputRestDto {
  @ApiProperty(AuthCredentialsSetInitialPasswordCommandFields.matricula.swaggerMetadata)
  matricula: string;

  @ApiProperty(AuthCredentialsSetInitialPasswordCommandFields.senha.swaggerMetadata)
  senha: string;
}

// ============================================================================
// Auth Recover Password
// ============================================================================

@ApiSchema({ name: "AuthRecoverPasswordInputDto" })
export class AuthRecoverPasswordInputRestDto {
  @ApiProperty(AuthRecoverPasswordCommandFields.email.swaggerMetadata)
  email: string;
}
