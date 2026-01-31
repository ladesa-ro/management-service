import { ArgsType, Field, ID, InputType, ObjectType } from "@nestjs/graphql";
import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";
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
  PaginationInputDto,
  PaginationMetaDto,
  TransformToArray,
} from "@/modules/@shared/infrastructure/presentation/rest/dtos";
import { ImagemFindOneOutputDto } from "@/server/nest/modules/bloco/rest";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("Usuario")
@RegisterModel({
  name: "UsuarioFindOneOutput",
  properties: [
    simpleProperty("id"),
    simpleProperty("nome", { nullable: true }),
    simpleProperty("matriculaSiape", { nullable: true }),
    simpleProperty("email", { nullable: true }),
    simpleProperty("isSuperUser"),
    referenceProperty("imagemCapa", "ImagemFindOneOutput", { nullable: true }),
    referenceProperty("imagemPerfil", "ImagemFindOneOutput", { nullable: true }),
    ...commonProperties.dated,
  ],
})
export class UsuarioFindOneOutputDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;

  @ApiPropertyOptional({ description: "Nome do usuario", nullable: true, minLength: 1 })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(1)
  nome: string | null;

  @ApiPropertyOptional({ description: "Matricula SIAPE do usuario", nullable: true, minLength: 1 })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(1)
  matriculaSiape: string | null;

  @ApiPropertyOptional({ description: "E-mail do usuario", nullable: true, format: "email" })
  @Field({ nullable: true })
  @IsOptional()
  @IsEmail()
  email: string | null;

  @ApiProperty({ description: "Diz que o usuario tem poderes de administrador" })
  @Field()
  @IsBoolean()
  isSuperUser: boolean;

  @ApiPropertyOptional({
    type: () => ImagemFindOneOutputDto,
    description: "Imagem de capa do usuario",
    nullable: true,
  })
  @Field(() => ImagemFindOneOutputDto, { nullable: true })
  @IsOptional()
  @ValidateNested()
  @Type(() => ImagemFindOneOutputDto)
  imagemCapa: ImagemFindOneOutputDto | null;

  @ApiPropertyOptional({
    type: () => ImagemFindOneOutputDto,
    description: "Imagem de perfil do usuario",
    nullable: true,
  })
  @Field(() => ImagemFindOneOutputDto, { nullable: true })
  @IsOptional()
  @ValidateNested()
  @Type(() => ImagemFindOneOutputDto)
  imagemPerfil: ImagemFindOneOutputDto | null;

  @ApiProperty({ description: "Data e hora da criacao do registro" })
  @Field()
  @IsDateString()
  dateCreated: Date;

  @ApiProperty({ description: "Data e hora da alteracao do registro" })
  @Field()
  @IsDateString()
  dateUpdated: Date;

  @ApiPropertyOptional({ description: "Data e hora da exclusao do registro", nullable: true })
  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  dateDeleted: Date | null;
}

// ============================================================================
// Ensino Output (dados de ensino do usuario)
// ============================================================================

@ObjectType("UsuarioEnsinoTurmaRef")
export class UsuarioEnsinoTurmaRefDto {
  @ApiProperty({ description: "ID da turma", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;

  @ApiProperty({ description: "Periodo da turma" })
  @Field()
  @IsString()
  periodo: string;
}

@ObjectType("UsuarioEnsinoCursoRef")
export class UsuarioEnsinoCursoRefDto {
  @ApiProperty({ description: "ID do curso", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;

  @ApiProperty({ description: "Nome do curso" })
  @Field()
  @IsString()
  nome: string;

  @ApiProperty({
    description: "Turmas do curso onde o usuario leciona",
    type: () => [UsuarioEnsinoTurmaRefDto],
  })
  @Field(() => [UsuarioEnsinoTurmaRefDto])
  @ValidateNested({ each: true })
  @Type(() => UsuarioEnsinoTurmaRefDto)
  turmas: UsuarioEnsinoTurmaRefDto[];
}

@ObjectType("UsuarioEnsinoDisciplinaRef")
export class UsuarioEnsinoDisciplinaRefDto {
  @ApiProperty({ description: "ID da disciplina", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;

  @ApiProperty({ description: "Nome da disciplina" })
  @Field()
  @IsString()
  nome: string;

  @ApiProperty({
    description: "Cursos onde o usuario leciona esta disciplina",
    type: () => [UsuarioEnsinoCursoRefDto],
  })
  @Field(() => [UsuarioEnsinoCursoRefDto])
  @ValidateNested({ each: true })
  @Type(() => UsuarioEnsinoCursoRefDto)
  cursos: UsuarioEnsinoCursoRefDto[];
}

@ObjectType("UsuarioEnsinoOutput")
export class UsuarioEnsinoOutputDto {
  @ApiProperty({ description: "Dados do usuario", type: () => UsuarioFindOneOutputDto })
  @Field(() => UsuarioFindOneOutputDto)
  @ValidateNested()
  @Type(() => UsuarioFindOneOutputDto)
  usuario: UsuarioFindOneOutputDto;

  @ApiProperty({
    description: "Disciplinas onde o usuario leciona (com cursos e turmas)",
    type: () => [UsuarioEnsinoDisciplinaRefDto],
  })
  @Field(() => [UsuarioEnsinoDisciplinaRefDto])
  @ValidateNested({ each: true })
  @Type(() => UsuarioEnsinoDisciplinaRefDto)
  disciplinas: UsuarioEnsinoDisciplinaRefDto[];
}

// ============================================================================
// List Input/Output
// ============================================================================

@ArgsType()
@InputType("UsuarioListInput")
export class UsuarioListInputDto extends PaginationInputDto {
  @ApiPropertyOptional({
    description: "Filtro por ID",
    type: [String],
  })
  @TransformToArray()
  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.id"?: string[];
}

@ObjectType("UsuarioListOutput")
export class UsuarioListOutputDto {
  @ApiProperty({ type: () => PaginationMetaDto, description: "Metadados da busca" })
  @Field(() => PaginationMetaDto)
  meta: PaginationMetaDto;

  @ApiProperty({ type: () => [UsuarioFindOneOutputDto], description: "Resultados da busca" })
  @Field(() => [UsuarioFindOneOutputDto])
  data: UsuarioFindOneOutputDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@InputType("UsuarioCreateInput")
export class UsuarioCreateInputDto {
  @ApiPropertyOptional({ description: "Nome do usuario", nullable: true, minLength: 1 })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(1)
  nome?: string | null;

  @ApiPropertyOptional({ description: "Matricula SIAPE do usuario", nullable: true, minLength: 1 })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(1)
  matriculaSiape?: string | null;

  @ApiPropertyOptional({ description: "E-mail do usuario", nullable: true, format: "email" })
  @Field({ nullable: true })
  @IsOptional()
  @IsEmail()
  email?: string | null;
}

@InputType("UsuarioUpdateInput")
export class UsuarioUpdateInputDto extends PartialType(UsuarioCreateInputDto) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ArgsType()
@InputType("UsuarioFindOneInput")
export class UsuarioFindOneInputDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;
}
