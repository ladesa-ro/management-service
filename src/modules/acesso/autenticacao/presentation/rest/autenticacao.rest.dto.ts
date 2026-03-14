import { ApiProperty, ApiPropertyOptional, ApiSchema } from "@/modules/@shared/presentation/rest";
import {
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  Type,
  ValidateNested,
} from "@/modules/@shared/presentation/shared";
import { PerfilFindOneOutputRestDto } from "@/modules/acesso/perfil/presentation/rest";
import { UsuarioFindOneOutputRestDto } from "@/modules/acesso/usuario/presentation/rest";

// ============================================================================
// Auth Login Input
// ============================================================================

@ApiSchema({ name: "AuthLoginInputDto" })
export class AuthLoginInputRestDto {
  @ApiProperty({ type: "string", description: "Matrícula" })
  @IsString()
  matricula: string;

  @ApiProperty({ type: "string", description: "Senha" })
  @IsString()
  senha: string;
}

// ============================================================================
// Auth Refresh Input
// ============================================================================

@ApiSchema({ name: "AuthRefreshInputDto" })
export class AuthRefreshInputRestDto {
  @ApiProperty({ type: "string", description: "Token de refresh" })
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
  @ApiPropertyOptional({ type: "string", description: "Token de acesso", nullable: true })
  @IsOptional()
  @IsString()
  access_token: string | null;

  @ApiPropertyOptional({ type: "string", description: "Tipo do token", nullable: true })
  @IsOptional()
  @IsString()
  token_type: string | null;

  @ApiPropertyOptional({ type: "string", description: "Token de identificacao", nullable: true })
  @IsOptional()
  @IsString()
  id_token: string | null;

  @ApiPropertyOptional({ type: "string", description: "Token de refresh", nullable: true })
  @IsOptional()
  @IsString()
  refresh_token: string | null;

  @ApiPropertyOptional({
    type: "integer",
    description: "Tempo de expiracao do token",
    nullable: true,
  })
  @IsOptional()
  @IsInt()
  expires_in: number | null;

  @ApiPropertyOptional({
    type: "integer",
    description: "Tempo de expiracao do token",
    nullable: true,
  })
  @IsOptional()
  @IsInt()
  expires_at: number | null;

  @ApiPropertyOptional({ type: "string", description: "Estado da sessao", nullable: true })
  @IsOptional()
  @IsString()
  session_state: string | null;

  @ApiPropertyOptional({ type: "string", description: "Escopo da autenticacao", nullable: true })
  @IsOptional()
  @IsString()
  scope: string | null;
}

// ============================================================================
// Auth Set Initial Password
// ============================================================================

@ApiSchema({ name: "AuthCredentialsSetInitialPasswordInputDto" })
export class AuthCredentialsSetInitialPasswordInputRestDto {
  @ApiProperty({ type: "string", description: "Matrícula" })
  @IsString()
  matricula: string;

  @ApiProperty({ type: "string", description: "Nova senha" })
  @IsString()
  senha: string;
}

// ============================================================================
// Auth Recover Password
// ============================================================================

@ApiSchema({ name: "AuthRecoverPasswordInputDto" })
export class AuthRecoverPasswordInputRestDto {
  @ApiProperty({ type: "string", description: "E-mail" })
  @IsString()
  email: string;
}
