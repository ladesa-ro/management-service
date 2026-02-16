import { ApiProperty, ApiPropertyOptional, ApiSchema } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsInt, IsOptional, IsString, ValidateNested } from "class-validator";
import { decorate } from "ts-mixer";
import { PerfilFindOneOutputRestDto } from "@/modules/@acesso/perfil/presentation/rest";
import { UsuarioFindOneOutputRestDto } from "@/modules/@acesso/usuario/presentation/rest";

// ============================================================================
// Auth Login Input
// ============================================================================

@decorate(ApiSchema({ name: "AuthLoginInputDto" }))
export class AuthLoginInputRestDto {
  @decorate(ApiProperty({ type: "string", description: "Matricula SIAPE" }))
  @decorate(IsString())
  matriculaSiape: string;

  @decorate(ApiProperty({ type: "string", description: "Senha" }))
  @decorate(IsString())
  senha: string;
}

// ============================================================================
// Auth Refresh Input
// ============================================================================

@decorate(ApiSchema({ name: "AuthRefreshInputDto" }))
export class AuthRefreshInputRestDto {
  @decorate(ApiProperty({ type: "string", description: "Token de refresh" }))
  @decorate(IsString())
  refreshToken: string;
}

// ============================================================================
// Auth WhoAmI Output
// ============================================================================

@decorate(ApiSchema({ name: "AuthWhoAmIOutputDto" }))
export class AuthWhoAmIOutputRestDto {
  @decorate(
    ApiPropertyOptional({
      type: () => UsuarioFindOneOutputRestDto,
      description: "Usuario autenticado",
      nullable: true,
    }),
  )
  @decorate(IsOptional())
  @decorate(ValidateNested())
  @decorate(Type(() => UsuarioFindOneOutputRestDto))
  usuario: UsuarioFindOneOutputRestDto | null;

  @decorate(
    ApiProperty({
      type: () => [PerfilFindOneOutputRestDto],
      description: "Vinculos do usuario logado",
    }),
  )
  @decorate(IsArray())
  @decorate(ValidateNested({ each: true }))
  @decorate(Type(() => PerfilFindOneOutputRestDto))
  perfisAtivos: PerfilFindOneOutputRestDto[];
}

// ============================================================================
// Auth Session Credentials
// ============================================================================

@decorate(ApiSchema({ name: "AuthSessionCredentialsDto" }))
export class AuthSessionCredentialsRestDto {
  @decorate(ApiPropertyOptional({ type: "string", description: "Token de acesso", nullable: true }))
  @decorate(IsOptional())
  @decorate(IsString())
  access_token: string | null;

  @decorate(ApiPropertyOptional({ type: "string", description: "Tipo do token", nullable: true }))
  @decorate(IsOptional())
  @decorate(IsString())
  token_type: string | null;

  @decorate(
    ApiPropertyOptional({ type: "string", description: "Token de identificacao", nullable: true }),
  )
  @decorate(IsOptional())
  @decorate(IsString())
  id_token: string | null;

  @decorate(
    ApiPropertyOptional({ type: "string", description: "Token de refresh", nullable: true }),
  )
  @decorate(IsOptional())
  @decorate(IsString())
  refresh_token: string | null;

  @decorate(
    ApiPropertyOptional({
      type: "integer",
      description: "Tempo de expiracao do token",
      nullable: true,
    }),
  )
  @decorate(IsOptional())
  @decorate(IsInt())
  expires_in: number | null;

  @decorate(
    ApiPropertyOptional({
      type: "integer",
      description: "Tempo de expiracao do token",
      nullable: true,
    }),
  )
  @decorate(IsOptional())
  @decorate(IsInt())
  expires_at: number | null;

  @decorate(
    ApiPropertyOptional({ type: "string", description: "Estado da sessao", nullable: true }),
  )
  @decorate(IsOptional())
  @decorate(IsString())
  session_state: string | null;

  @decorate(
    ApiPropertyOptional({ type: "string", description: "Escopo da autenticacao", nullable: true }),
  )
  @decorate(IsOptional())
  @decorate(IsString())
  scope: string | null;
}

// ============================================================================
// Auth Set Initial Password
// ============================================================================

@decorate(ApiSchema({ name: "AuthCredentialsSetInitialPasswordInputDto" }))
export class AuthCredentialsSetInitialPasswordInputRestDto {
  @decorate(ApiProperty({ type: "string", description: "Matricula SIAPE" }))
  @decorate(IsString())
  matriculaSiape: string;

  @decorate(ApiProperty({ type: "string", description: "Nova senha" }))
  @decorate(IsString())
  senha: string;
}

// ============================================================================
// Auth Recover Password
// ============================================================================

@decorate(ApiSchema({ name: "AuthRecoverPasswordInputDto" }))
export class AuthRecoverPasswordInputRestDto {
  @decorate(ApiProperty({ type: "string", description: "E-mail" }))
  @decorate(IsString())
  email: string;
}
