import { ArgsType, Field, ID, InputType, Int, ObjectType, PartialType } from "@nestjs/graphql";
// Note: AmbienteListInputDto does not use @InputType or @Field for filter fields
// because GraphQL field names cannot contain dots. Use AmbienteListInputGqlDto for GraphQL.
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsArray,
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
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
import {
  BlocoFindOneInputDto,
  BlocoFindOneOutputDto,
  ImagemFindOneOutputDto,
} from "@/server/nest/modules/bloco/rest";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("Ambiente")
@RegisterModel({
  name: "AmbienteFindOneOutput",
  properties: [
    simpleProperty("id"),
    simpleProperty("nome"),
    simpleProperty("descricao", { nullable: true }),
    simpleProperty("codigo"),
    simpleProperty("capacidade", { nullable: true }),
    simpleProperty("tipo", { nullable: true }),
    referenceProperty("bloco", "BlocoFindOneOutput"),
    referenceProperty("imagemCapa", "ImagemFindOneOutput", { nullable: true }),
    ...commonProperties.dated,
  ],
})
export class AmbienteFindOneOutputDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;

  @ApiProperty({ description: "Nome do ambiente/sala", minLength: 1 })
  @Field()
  @IsString()
  @MinLength(1)
  nome: string;

  @ApiPropertyOptional({ description: "Descricao do ambiente/sala", nullable: true })
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  descricao: string | null;

  @ApiProperty({ description: "Codigo do ambiente/sala", minLength: 1 })
  @Field()
  @IsString()
  @MinLength(1)
  codigo: string;

  @ApiPropertyOptional({ description: "Capacidade do ambiente/sala", nullable: true })
  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  capacidade: number | null;

  @ApiPropertyOptional({
    description: "Tipo do ambiente/sala. Ex.: sala aula, auditorio, laboratorio de quimica",
    nullable: true,
  })
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  tipo: string | null;

  @ApiProperty({
    type: () => BlocoFindOneOutputDto,
    description: "Bloco que o ambiente/sala pertence",
  })
  @Field(() => BlocoFindOneOutputDto)
  @ValidateNested()
  @Type(() => BlocoFindOneOutputDto)
  bloco: BlocoFindOneOutputDto;

  @ApiPropertyOptional({
    type: () => ImagemFindOneOutputDto,
    description: "Imagem de capa do ambiente",
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
  @Field(() => Date, { nullable: true })
  @IsOptional()
  @IsDateString()
  dateDeleted: Date | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ArgsType()
export class AmbienteListInputDto extends PaginationInputDto {
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
    description: "Filtro por ID do Bloco",
    type: [String],
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.bloco.id"?: string[];

  @ApiPropertyOptional({
    description: "Filtro por ID do Campus do Bloco",
    type: [String],
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.bloco.campus.id"?: string[];
}

@ObjectType("AmbienteListOutput")
export class AmbienteListOutputDto {
  @ApiProperty({ type: () => PaginationMetaDto, description: "Metadados da busca" })
  @Field(() => PaginationMetaDto)
  meta: PaginationMetaDto;

  @ApiProperty({ type: () => [AmbienteFindOneOutputDto], description: "Resultados da busca" })
  @Field(() => [AmbienteFindOneOutputDto])
  data: AmbienteFindOneOutputDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@InputType("AmbienteCreateInput")
export class AmbienteCreateInputDto {
  @ApiProperty({ description: "Nome do ambiente/sala", minLength: 1 })
  @Field()
  @IsString()
  @MinLength(1)
  nome: string;

  @ApiPropertyOptional({ description: "Descricao do ambiente/sala", nullable: true })
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  descricao?: string | null;

  @ApiProperty({ description: "Codigo do ambiente/sala", minLength: 1 })
  @Field()
  @IsString()
  @MinLength(1)
  codigo: string;

  @ApiPropertyOptional({ description: "Capacidade do ambiente/sala", nullable: true })
  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  capacidade?: number | null;

  @ApiPropertyOptional({
    description: "Tipo do ambiente/sala. Ex.: sala aula, auditorio, laboratorio de quimica",
    nullable: true,
  })
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  tipo?: string | null;

  @ApiProperty({
    type: () => BlocoFindOneInputDto,
    description: "Bloco que o ambiente/sala pertence",
  })
  @Field(() => BlocoFindOneInputDto)
  @ValidateNested()
  @Type(() => BlocoFindOneInputDto)
  bloco: BlocoFindOneInputDto;
}

@InputType("AmbienteUpdateInput")
export class AmbienteUpdateInputDto extends PartialType(AmbienteCreateInputDto) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ArgsType()
@InputType("AmbienteFindOneInput")
export class AmbienteFindOneInputDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;
}
