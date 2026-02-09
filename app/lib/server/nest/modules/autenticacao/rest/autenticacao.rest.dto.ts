import { ApiProperty, ApiPropertyOptional, ApiSchema } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsInt, IsOptional, IsString, ValidateNested } from "class-validator";
import { PerfilFindOneOutputRestDto } from "@/server/nest/modules/perfil/rest";
import { UsuarioFindOneOutputRestDto } from "@/server/nest/modules/usuario/rest";

// ============================================================================
// Auth Login Input
// ============================================================================

@ApiSchema({ name: "AuthLoginInputDto" })
export class AuthLoginInputRestDto {
  @ApiProperty({ description: "Matricula SIAPE" })
  @IsString()
  matriculaSiape: string;

  @ApiProperty({ description: "Senha" })
  @IsString()
  senha: string;
}

// ============================================================================
// Auth Refresh Input
// ============================================================================

@ApiSchema({ name: "AuthRefreshInputDto" })
export class AuthRefreshInputRestDto {
  @ApiProperty({ description: "Token de refresh" })
  @IsString()
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
  @IsOptional()
  @ValidateNested()
  @Type(() => UsuarioFindOneOutputRestDto)
  usuario: UsuarioFindOneOutputRestDto | null;

  @ApiProperty({
    type: () => [PerfilFindOneOutputRestDto],
    description: "Vinculos do usuario logado",
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PerfilFindOneOutputRestDto)
  perfisAtivos: PerfilFindOneOutputRestDto[];
}

// ============================================================================
// Auth Session Credentials
// ============================================================================

@ApiSchema({ name: "AuthSessionCredentialsDto" })
export class AuthSessionCredentialsRestDto {
  @ApiPropertyOptional({ description: "Token de acesso", nullable: true })
  @IsOptional()
  @IsString()
  access_token: string | null;

  @ApiPropertyOptional({ description: "Tipo do token", nullable: true })
  @IsOptional()
  @IsString()
  token_type: string | null;

  @ApiPropertyOptional({ description: "Token de identificacao", nullable: true })
  @IsOptional()
  @IsString()
  id_token: string | null;

  @ApiPropertyOptional({ description: "Token de refresh", nullable: true })
  @IsOptional()
  @IsString()
  refresh_token: string | null;

  @ApiPropertyOptional({ description: "Tempo de expiracao do token", nullable: true })
  @IsOptional()
  @IsInt()
  expires_in: number | null;

  @ApiPropertyOptional({ description: "Tempo de expiracao do token", nullable: true })
  @IsOptional()
  @IsInt()
  expires_at: number | null;

  @ApiPropertyOptional({ description: "Estado da sessao", nullable: true })
  @IsOptional()
  @IsString()
  session_state: string | null;

  @ApiPropertyOptional({ description: "Escopo da autenticacao", nullable: true })
  @IsOptional()
  @IsString()
  scope: string | null;
}

// ============================================================================
// Auth Set Initial Password
// ============================================================================

@ApiSchema({ name: "AuthCredentialsSetInitialPasswordInputDto" })
export class AuthCredentialsSetInitialPasswordInputRestDto {
  @ApiProperty({ description: "Matricula SIAPE" })
  @IsString()
  matriculaSiape: string;

  @ApiProperty({ description: "Nova senha" })
  @IsString()
  senha: string;
}

// ============================================================================
// Auth Recover Password
// ============================================================================

@ApiSchema({ name: "AuthRecoverPasswordInputDto" })
export class AuthRecoverPasswordInputRestDto {
  @ApiProperty({ description: "E-mail" })
  @IsString()
  email: string;
}
