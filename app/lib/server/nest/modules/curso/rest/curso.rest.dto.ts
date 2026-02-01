import { ArgsType, Field, ID, InputType, ObjectType, PartialType } from "@nestjs/graphql";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsArray,
  IsDateString,
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
import { CampusFindOneInputDto, CampusFindOneOutputDto } from "@/server/nest/modules/campus/rest";
import {
  OfertaFormacaoFindOneInputDto,
  OfertaFormacaoFindOneOutputDto,
} from "@/server/nest/modules/oferta-formacao/rest";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("Curso")
@RegisterModel({
  name: "CursoFindOneOutput",
  properties: [
    simpleProperty("id"),
    simpleProperty("nome"),
    simpleProperty("nomeAbreviado"),
    referenceProperty("campus", "CampusFindOneOutput"),
    referenceProperty("ofertaFormacao", "OfertaFormacaoFindOneOutput"),
    referenceProperty("imagemCapa", "ImagemFindOneOutput", { nullable: true }),
    ...commonProperties.dated,
  ],
})
export class CursoFindOneOutputDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;

  @ApiProperty({ description: "Nome do curso", minLength: 1 })
  @Field()
  @IsString()
  @MinLength(1)
  nome: string;

  @ApiProperty({ description: "Nome abreviado do curso", minLength: 1 })
  @Field()
  @IsString()
  @MinLength(1)
  nomeAbreviado: string;

  @ApiProperty({ type: () => CampusFindOneOutputDto, description: "Campus que o curso pertence" })
  @Field(() => CampusFindOneOutputDto)
  @ValidateNested()
  @Type(() => CampusFindOneOutputDto)
  campus: CampusFindOneOutputDto;

  @ApiProperty({
    type: () => OfertaFormacaoFindOneOutputDto,
    description: "Oferta de formacao do curso",
  })
  @Field(() => OfertaFormacaoFindOneOutputDto)
  @ValidateNested()
  @Type(() => OfertaFormacaoFindOneOutputDto)
  ofertaFormacao: OfertaFormacaoFindOneOutputDto;

  @ApiPropertyOptional({
    type: () => ImagemFindOneOutputDto,
    description: "Imagem de capa do curso",
    nullable: true,
  })
  @Field(() => ImagemFindOneOutputDto, { nullable: true })
  @IsOptional()
  @ValidateNested()
  @Type(() => ImagemFindOneOutputDto)
  imagemCapa: ImagemFindOneOutputDto | null;

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
export class CursoListInputDto extends PaginationInputDto {
  @ApiPropertyOptional({
    description: "Filtro por ID",
    type: [String],
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.id"?: string[];

  @ApiPropertyOptional({
    description: "Filtro por ID do Campus",
    type: [String],
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.campus.id"?: string[];

  @ApiPropertyOptional({
    description: "Filtro por ID da Oferta de Formacao",
    type: [String],
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.ofertaFormacao.id"?: string[];
}

@ObjectType("CursoListOutput")
export class CursoListOutputDto {
  @ApiProperty({ type: () => PaginationMetaDto, description: "Metadados da busca" })
  @Field(() => PaginationMetaDto)
  meta: PaginationMetaDto;

  @ApiProperty({ type: () => [CursoFindOneOutputDto], description: "Resultados da busca" })
  @Field(() => [CursoFindOneOutputDto])
  data: CursoFindOneOutputDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@InputType("CursoCreateInput")
export class CursoCreateInputDto {
  @ApiProperty({ description: "Nome do curso", minLength: 1 })
  @Field()
  @IsString()
  @MinLength(1)
  nome: string;

  @ApiProperty({ description: "Nome abreviado do curso", minLength: 1 })
  @Field()
  @IsString()
  @MinLength(1)
  nomeAbreviado: string;

  @ApiProperty({ type: () => CampusFindOneInputDto, description: "Campus que o curso pertence" })
  @Field(() => CampusFindOneInputDto)
  @ValidateNested()
  @Type(() => CampusFindOneInputDto)
  campus: CampusFindOneInputDto;

  @ApiProperty({
    type: () => OfertaFormacaoFindOneInputDto,
    description: "Oferta de formacao do curso",
  })
  @Field(() => OfertaFormacaoFindOneInputDto)
  @ValidateNested()
  @Type(() => OfertaFormacaoFindOneInputDto)
  ofertaFormacao: OfertaFormacaoFindOneInputDto;
}

@InputType("CursoUpdateInput")
export class CursoUpdateInputDto extends PartialType(CursoCreateInputDto) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ArgsType()
@InputType("CursoFindOneInput")
export class CursoFindOneInputDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;
}
