import { ArgsType, Field, ID, InputType, ObjectType } from "@nestjs/graphql";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsOptional,
  IsString,
  IsUUID,
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
import { CampusFindOneInputDto, CampusFindOneOutputDto } from "@/server/nest/modules/campus/rest";
import {
  UsuarioFindOneInputDto,
  UsuarioFindOneOutputDto,
} from "@/server/nest/modules/usuario/rest";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("Perfil")
@RegisterModel({
  name: "PerfilFindOneOutput",
  properties: [
    simpleProperty("id"),
    simpleProperty("ativo"),
    simpleProperty("cargo"),
    referenceProperty("campus", "CampusFindOneOutput"),
    referenceProperty("usuario", "UsuarioFindOneOutput"),
    ...commonProperties.dated,
  ],
})
export class PerfilFindOneOutputDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;

  @ApiProperty({ description: "Indica se o vinculo esta ativo" })
  @Field()
  @IsBoolean()
  ativo: boolean;

  @ApiProperty({ description: "Cargo do usuario no vinculo" })
  @Field()
  @IsString()
  cargo: string;

  @ApiProperty({ type: () => CampusFindOneOutputDto, description: "Campus associado ao vinculo" })
  @Field(() => CampusFindOneOutputDto)
  @ValidateNested()
  @Type(() => CampusFindOneOutputDto)
  campus: CampusFindOneOutputDto;

  @ApiProperty({ type: () => UsuarioFindOneOutputDto, description: "Usuario associado ao vinculo" })
  @Field(() => UsuarioFindOneOutputDto)
  @ValidateNested()
  @Type(() => UsuarioFindOneOutputDto)
  usuario: UsuarioFindOneOutputDto;

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
@InputType("PerfilListInput")
export class PerfilListInputDto extends PaginationInputDto {
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

  @ApiPropertyOptional({
    description: "Filtro por ativo",
    type: [String],
  })
  @TransformToArray()
  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.ativo"?: string[];

  @ApiPropertyOptional({
    description: "Filtro por cargo",
    type: [String],
  })
  @TransformToArray()
  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.cargo"?: string[];

  @ApiPropertyOptional({
    description: "Filtro por ID do Campus",
    type: [String],
  })
  @TransformToArray()
  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.campus.id"?: string[];

  @ApiPropertyOptional({
    description: "Filtro por ID do Usuario",
    type: [String],
  })
  @TransformToArray()
  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.usuario.id"?: string[];
}

@ObjectType("PerfilListOutput")
export class PerfilListOutputDto {
  @ApiProperty({ type: () => PaginationMetaDto, description: "Metadados da busca" })
  @Field(() => PaginationMetaDto)
  meta: PaginationMetaDto;

  @ApiProperty({ type: () => [PerfilFindOneOutputDto], description: "Resultados da busca" })
  @Field(() => [PerfilFindOneOutputDto])
  data: PerfilFindOneOutputDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@InputType("PerfilUpdateInput")
export class PerfilUpdateInputDto {
  @ApiProperty({ description: "Cargos do usuario no vinculo", type: [String] })
  @Field(() => [String])
  @IsArray()
  @IsString({ each: true })
  cargos: string[];

  @ApiProperty({ type: () => CampusFindOneInputDto, description: "Campus associado ao vinculo" })
  @Field(() => CampusFindOneInputDto)
  @ValidateNested()
  @Type(() => CampusFindOneInputDto)
  campus: CampusFindOneInputDto;

  @ApiProperty({ type: () => UsuarioFindOneInputDto, description: "Usuario associado ao vinculo" })
  @Field(() => UsuarioFindOneInputDto)
  @ValidateNested()
  @Type(() => UsuarioFindOneInputDto)
  usuario: UsuarioFindOneInputDto;
}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ArgsType()
@InputType("PerfilFindOneInput")
export class PerfilFindOneInputDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;
}
