import { ArgsType, Field, ID, InputType, Int, ObjectType } from "@nestjs/graphql";
import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsArray,
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
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
import { CampusFindOneInputDto, CampusFindOneOutputDto } from "@/server/nest/modules/campus/rest";
import {
  OfertaFormacaoFindOneInputDto,
  OfertaFormacaoFindOneOutputDto,
} from "@/server/nest/modules/oferta-formacao/rest";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("CalendarioLetivo")
@RegisterModel({
  name: "CalendarioLetivoFindOneOutput",
  properties: [
    simpleProperty("id"),
    simpleProperty("nome"),
    simpleProperty("ano"),
    referenceProperty("campus", "CampusFindOneOutput"),
    referenceProperty("ofertaFormacao", "OfertaFormacaoFindOneOutput"),
    ...commonProperties.dated,
  ],
})
export class CalendarioLetivoFindOneOutputDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;

  @ApiProperty({ description: "Nome do calendario letivo", minLength: 1 })
  @Field()
  @IsString()
  @MinLength(1)
  nome: string;

  @ApiProperty({ description: "Ano do calendario letivo", minimum: 0, maximum: 65535 })
  @Field(() => Int)
  @IsInt()
  @Min(0)
  @Max(65535)
  ano: number;

  @ApiProperty({
    type: () => CampusFindOneOutputDto,
    description: "Campus ao qual o calendario letivo pertence",
  })
  @Field(() => CampusFindOneOutputDto)
  @ValidateNested()
  @Type(() => CampusFindOneOutputDto)
  campus: CampusFindOneOutputDto;

  @ApiProperty({
    type: () => OfertaFormacaoFindOneOutputDto,
    description: "Oferta de formacao do calendario letivo",
  })
  @Field(() => OfertaFormacaoFindOneOutputDto)
  @ValidateNested()
  @Type(() => OfertaFormacaoFindOneOutputDto)
  ofertaFormacao: OfertaFormacaoFindOneOutputDto;

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
@InputType("CalendarioLetivoListInput")
export class CalendarioLetivoListInputDto extends PaginationInputDto {
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
    description: "Filtro por ID da Oferta de Formacao",
    type: [String],
  })
  @TransformToArray()
  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.ofertaFormacao.id"?: string[];
}

@ObjectType("CalendarioLetivoListOutput")
export class CalendarioLetivoListOutputDto {
  @ApiProperty({ type: () => PaginationMetaDto, description: "Metadados da busca" })
  @Field(() => PaginationMetaDto)
  meta: PaginationMetaDto;

  @ApiProperty({
    type: () => [CalendarioLetivoFindOneOutputDto],
    description: "Resultados da busca",
  })
  @Field(() => [CalendarioLetivoFindOneOutputDto])
  data: CalendarioLetivoFindOneOutputDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@InputType("CalendarioLetivoCreateInput")
export class CalendarioLetivoCreateInputDto {
  @ApiProperty({ description: "Nome do calendario letivo", minLength: 1 })
  @Field()
  @IsString()
  @MinLength(1)
  nome: string;

  @ApiProperty({ description: "Ano do calendario letivo", minimum: 0, maximum: 65535 })
  @Field(() => Int)
  @IsInt()
  @Min(0)
  @Max(65535)
  ano: number;

  @ApiProperty({
    type: () => CampusFindOneInputDto,
    description: "Campus ao qual o calendario letivo pertence",
  })
  @Field(() => CampusFindOneInputDto)
  @ValidateNested()
  @Type(() => CampusFindOneInputDto)
  campus: CampusFindOneInputDto;

  @ApiProperty({
    type: () => OfertaFormacaoFindOneInputDto,
    description: "Oferta de formacao do calendario letivo",
  })
  @Field(() => OfertaFormacaoFindOneInputDto)
  @ValidateNested()
  @Type(() => OfertaFormacaoFindOneInputDto)
  ofertaFormacao: OfertaFormacaoFindOneInputDto;
}

@InputType("CalendarioLetivoUpdateInput")
export class CalendarioLetivoUpdateInputDto extends PartialType(CalendarioLetivoCreateInputDto) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ArgsType()
@InputType("CalendarioLetivoFindOneInput")
export class CalendarioLetivoFindOneInputDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;
}
