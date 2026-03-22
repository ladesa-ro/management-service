import { PerfilFindOneOutputRestDto } from "@/modules/acesso/perfil/presentation.rest";
import { UsuarioFindOneOutputRestDto } from "@/modules/acesso/usuario/presentation.rest";
import { ApiProperty, ApiPropertyOptional, ApiSchema } from "@/shared/presentation/rest";

// ============================================================================
// Auth Login Input
// ============================================================================

@ApiSchema({ name: "AuthLoginInputDto" })
export class AuthLoginInputRestDto {
  @ApiProperty({ type: "string", description: "Matrícula" })
  matricula: string;

  @ApiProperty({ type: "string", description: "Senha" })
  senha: string;
}

// ============================================================================
// Auth Refresh Input
// ============================================================================

@ApiSchema({ name: "AuthRefreshInputDto" })
export class AuthRefreshInputRestDto {
  @ApiProperty({ type: "string", description: "Token de refresh" })
  refreshToken: string;
}

// ============================================================================
// Auth WhoAmI Output
// ============================================================================

@ApiSchema({ name: "AuthWhoAmIOutputDto" })
export class AuthWhoAmIOutputRestDto {
  @ApiPropertyOptional({
    type: () => UsuarioFindOneOutputRestDto,
    description: "Usuario autenticado",
    nullable: true,
  })
  usuario: UsuarioFindOneOutputRestDto | null;

  @ApiProperty({
    type: () => [PerfilFindOneOutputRestDto],
    description: "Vinculos do usuario logado",
  })
  perfisAtivos: PerfilFindOneOutputRestDto[];
}

// ============================================================================
// Auth Session Credentials
// ============================================================================

@ApiSchema({ name: "AuthSessionCredentialsDto" })
export class AuthSessionCredentialsRestDto {
  @ApiPropertyOptional({ type: "string", description: "Token de acesso", nullable: true })
  access_token: string | null;

  @ApiPropertyOptional({ type: "string", description: "Tipo do token", nullable: true })
  token_type: string | null;

  @ApiPropertyOptional({ type: "string", description: "Token de identificacao", nullable: true })
  id_token: string | null;

  @ApiPropertyOptional({ type: "string", description: "Token de refresh", nullable: true })
  refresh_token: string | null;

  @ApiPropertyOptional({
    type: "integer",
    description: "Tempo de expiracao do token",
    nullable: true,
  })
  expires_in: number | null;

  @ApiPropertyOptional({
    type: "integer",
    description: "Tempo de expiracao do token",
    nullable: true,
  })
  expires_at: number | null;

  @ApiPropertyOptional({ type: "string", description: "Estado da sessao", nullable: true })
  session_state: string | null;

  @ApiPropertyOptional({ type: "string", description: "Escopo da autenticacao", nullable: true })
  scope: string | null;
}

// ============================================================================
// Auth Set Initial Password
// ============================================================================

@ApiSchema({ name: "AuthCredentialsSetInitialPasswordInputDto" })
export class AuthCredentialsSetInitialPasswordInputRestDto {
  @ApiProperty({ type: "string", description: "Matrícula" })
  matricula: string;

  @ApiProperty({ type: "string", description: "Nova senha" })
  senha: string;
}

// ============================================================================
// Auth Recover Password
// ============================================================================

@ApiSchema({ name: "AuthRecoverPasswordInputDto" })
export class AuthRecoverPasswordInputRestDto {
  @ApiProperty({ type: "string", description: "E-mail" })
  email: string;
}
