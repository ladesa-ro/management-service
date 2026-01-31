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
  PaginationInputDto,
  PaginationMetaDto,
  TransformToArray,
} from "@/modules/@shared/infrastructure/presentation/rest/dtos";
import { ImagemFindOneOutputDto } from "@/server/nest/modules/bloco/rest";
import {
  commonProperties,
  RegisterModel,
  referenceProperty,
  simpleProperty,
} from "@/v2/old/shared/metadata";

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
