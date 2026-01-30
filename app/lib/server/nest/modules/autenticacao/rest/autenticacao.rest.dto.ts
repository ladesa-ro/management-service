import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsInt, IsOptional, IsString, ValidateNested } from "class-validator";
import { PerfilFindOneOutputDto } from "@/server/nest/modules/perfil/rest";
import { UsuarioFindOneOutputDto } from "@/v2/server/modules/usuario/http/dto";

// ============================================================================
// Auth Login Input
// ============================================================================

@InputType("AuthLoginInput")
export class AuthLoginInputDto {
  @ApiProperty({ description: "Matricula SIAPE" })
  @Field()
  @IsString()
  matriculaSiape: string;

  @ApiProperty({ description: "Senha" })
  @Field()
  @IsString()
  senha: string;
}

// ============================================================================
// Auth Refresh Input
// ============================================================================

@InputType("AuthRefreshInput")
export class AuthRefreshInputDto {
  @ApiProperty({ description: "Token de refresh" })
  @Field()
  @IsString()
  refreshToken: string;
}

// ============================================================================
// Auth WhoAmI Output
// ============================================================================

@ObjectType("AuthWhoAmI")
export class AuthWhoAmIOutputDto {
  @ApiPropertyOptional({
    type: () => UsuarioFindOneOutputDto,
    description: "Usuario autenticado",
    nullable: true,
  })
  @Field(() => UsuarioFindOneOutputDto, { nullable: true })
  @IsOptional()
  @ValidateNested()
  @Type(() => UsuarioFindOneOutputDto)
  usuario: UsuarioFindOneOutputDto | null;

  @ApiProperty({ type: () => [PerfilFindOneOutputDto], description: "Vinculos do usuario logado" })
  @Field(() => [PerfilFindOneOutputDto])
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PerfilFindOneOutputDto)
  perfisAtivos: PerfilFindOneOutputDto[];
}

// ============================================================================
// Auth Session Credentials
// ============================================================================

@ObjectType("AuthSessionCredentials")
export class AuthSessionCredentialsDto {
  @ApiPropertyOptional({ description: "Token de acesso", nullable: true })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  access_token: string | null;

  @ApiPropertyOptional({ description: "Tipo do token", nullable: true })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  token_type: string | null;

  @ApiPropertyOptional({ description: "Token de identificacao", nullable: true })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  id_token: string | null;

  @ApiPropertyOptional({ description: "Token de refresh", nullable: true })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  refresh_token: string | null;

  @ApiPropertyOptional({ description: "Tempo de expiracao do token", nullable: true })
  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  expires_in: number | null;

  @ApiPropertyOptional({ description: "Tempo de expiracao do token", nullable: true })
  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  expires_at: number | null;

  @ApiPropertyOptional({ description: "Estado da sessao", nullable: true })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  session_state: string | null;

  @ApiPropertyOptional({ description: "Escopo da autenticacao", nullable: true })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  scope: string | null;
}

// ============================================================================
// Auth Set Initial Password
// ============================================================================

@InputType("AuthCredentialsSetInitialPasswordInput")
export class AuthCredentialsSetInitialPasswordInputDto {
  @ApiProperty({ description: "Matricula SIAPE" })
  @Field()
  @IsString()
  matriculaSiape: string;

  @ApiProperty({ description: "Nova senha" })
  @Field()
  @IsString()
  senha: string;
}

// ============================================================================
// Auth Recover Password
// ============================================================================

@InputType("AuthRecoverPasswordInput")
export class AuthRecoverPasswordInputDto {
  @ApiProperty({ description: "E-mail" })
  @Field()
  @IsString()
  email: string;
}
