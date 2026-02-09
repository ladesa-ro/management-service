import { ApiProperty, ApiPropertyOptional, ApiSchema, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEmail,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
  ValidateNested,
} from "class-validator";
import {
  commonProperties,
  RegisterModel,
  referenceProperty,
  simpleProperty,
} from "@/modules/@shared/infrastructure/persistence/typeorm/metadata";
import {
  PaginationInputRestDto,
  PaginationMetaRestDto,
  TransformToArray,
} from "@/modules/@shared/infrastructure/presentation/rest/dtos";
import { ImagemFindOneOutputRestDto } from "@/server/nest/modules/bloco/rest";

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "UsuarioFindOneOutputDto" })
@RegisterModel({
  name: "UsuarioFindOneOutputDto",
  properties: [
    simpleProperty("id"),
    simpleProperty("nome", { nullable: true }),
    simpleProperty("matriculaSiape", { nullable: true }),
    simpleProperty("email", { nullable: true }),
    simpleProperty("isSuperUser"),
    referenceProperty("imagemCapa", "ImagemFindOneOutputDto", { nullable: true }),
    referenceProperty("imagemPerfil", "ImagemFindOneOutputDto", { nullable: true }),
    ...commonProperties.dated,
  ],
})
export class UsuarioFindOneOutputRestDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @IsUUID()
  id: string;

  @ApiPropertyOptional({ description: "Nome do usuario", nullable: true, minLength: 1 })
  @IsOptional()
  @IsString()
  @MinLength(1)
  nome: string | null;

  @ApiPropertyOptional({ description: "Matricula SIAPE do usuario", nullable: true, minLength: 1 })
  @IsOptional()
  @IsString()
  @MinLength(1)
  matriculaSiape: string | null;

  @ApiPropertyOptional({ description: "E-mail do usuario", nullable: true, format: "email" })
  @IsOptional()
  @IsEmail()
  email: string | null;

  @ApiProperty({ description: "Diz que o usuario tem poderes de administrador" })
  @IsBoolean()
  isSuperUser: boolean;

  @ApiPropertyOptional({
    type: () => ImagemFindOneOutputRestDto,
    description: "Imagem de capa do usuario",
    nullable: true,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ImagemFindOneOutputRestDto)
  imagemCapa: ImagemFindOneOutputRestDto | null;

  @ApiPropertyOptional({
    type: () => ImagemFindOneOutputRestDto,
    description: "Imagem de perfil do usuario",
    nullable: true,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ImagemFindOneOutputRestDto)
  imagemPerfil: ImagemFindOneOutputRestDto | null;

  @ApiProperty({ description: "Data e hora da criacao do registro" })
  @IsDateString()
  dateCreated: Date;

  @ApiProperty({ description: "Data e hora da alteracao do registro" })
  @IsDateString()
  dateUpdated: Date;

  @ApiPropertyOptional({ description: "Data e hora da exclusao do registro", nullable: true })
  @IsOptional()
  @IsDateString()
  dateDeleted: Date | null;
}

// ============================================================================
// Ensino Output (dados de ensino do usuario)
// ============================================================================

@ApiSchema({ name: "UsuarioEnsinoTurmaRefDto" })
export class UsuarioEnsinoTurmaRefRestDto {
  @ApiProperty({ description: "ID da turma", format: "uuid" })
  @IsUUID()
  id: string;

  @ApiProperty({ description: "Periodo da turma" })
  @IsString()
  periodo: string;
}

@ApiSchema({ name: "UsuarioEnsinoCursoRefDto" })
export class UsuarioEnsinoCursoRefRestDto {
  @ApiProperty({ description: "ID do curso", format: "uuid" })
  @IsUUID()
  id: string;

  @ApiProperty({ description: "Nome do curso" })
  @IsString()
  nome: string;

  @ApiProperty({
    description: "Turmas do curso onde o usuario leciona",
    type: () => [UsuarioEnsinoTurmaRefRestDto],
  })
  @ValidateNested({ each: true })
  @Type(() => UsuarioEnsinoTurmaRefRestDto)
  turmas: UsuarioEnsinoTurmaRefRestDto[];
}

@ApiSchema({ name: "UsuarioEnsinoDisciplinaRefDto" })
export class UsuarioEnsinoDisciplinaRefRestDto {
  @ApiProperty({ description: "ID da disciplina", format: "uuid" })
  @IsUUID()
  id: string;

  @ApiProperty({ description: "Nome da disciplina" })
  @IsString()
  nome: string;

  @ApiProperty({
    description: "Cursos onde o usuario leciona esta disciplina",
    type: () => [UsuarioEnsinoCursoRefRestDto],
  })
  @ValidateNested({ each: true })
  @Type(() => UsuarioEnsinoCursoRefRestDto)
  cursos: UsuarioEnsinoCursoRefRestDto[];
}

@ApiSchema({ name: "UsuarioEnsinoOutputDto" })
export class UsuarioEnsinoOutputRestDto {
  @ApiProperty({ description: "Dados do usuario", type: () => UsuarioFindOneOutputRestDto })
  @ValidateNested()
  @Type(() => UsuarioFindOneOutputRestDto)
  usuario: UsuarioFindOneOutputRestDto;

  @ApiProperty({
    description: "Disciplinas onde o usuario leciona (com cursos e turmas)",
    type: () => [UsuarioEnsinoDisciplinaRefRestDto],
  })
  @ValidateNested({ each: true })
  @Type(() => UsuarioEnsinoDisciplinaRefRestDto)
  disciplinas: UsuarioEnsinoDisciplinaRefRestDto[];
}

// ============================================================================
// List Input/Output
// ============================================================================

@ApiSchema({ name: "UsuarioListInputDto" })
export class UsuarioListInputRestDto extends PaginationInputRestDto {
  @ApiPropertyOptional({
    description: "Filtro por ID",
    type: [String],
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  "filter.id"?: string[];
}

@ApiSchema({ name: "UsuarioListOutputDto" })
export class UsuarioListOutputRestDto {
  @ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" })
  meta: PaginationMetaRestDto;

  @ApiProperty({ type: () => [UsuarioFindOneOutputRestDto], description: "Resultados da busca" })
  data: UsuarioFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@ApiSchema({ name: "UsuarioCreateInputDto" })
export class UsuarioCreateInputRestDto {
  @ApiPropertyOptional({ description: "Nome do usuario", nullable: true, minLength: 1 })
  @IsOptional()
  @IsString()
  @MinLength(1)
  nome?: string | null;

  @ApiPropertyOptional({ description: "Matricula SIAPE do usuario", nullable: true, minLength: 1 })
  @IsOptional()
  @IsString()
  @MinLength(1)
  matriculaSiape?: string | null;

  @ApiPropertyOptional({ description: "E-mail do usuario", nullable: true, format: "email" })
  @IsOptional()
  @IsEmail()
  email?: string | null;
}

@ApiSchema({ name: "UsuarioUpdateInputDto" })
export class UsuarioUpdateInputRestDto extends PartialType(UsuarioCreateInputRestDto) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "UsuarioFindOneInputDto" })
export class UsuarioFindOneInputRestDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @IsUUID()
  id: string;
}
