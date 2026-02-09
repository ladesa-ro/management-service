// Note: AmbienteListInputRestDto does not use @InputType or @Field for filter fields
// because GraphQL field names cannot contain dots. Use AmbienteListInputGraphQlDto for GraphQL.
import { ApiProperty, ApiPropertyOptional, ApiSchema, PartialType } from "@nestjs/swagger";
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
  PaginationInputRestDto,
  PaginationMetaRestDto,
  TransformToArray,
} from "@/modules/@shared/infrastructure/presentation/rest/dtos";
import {
  BlocoFindOneInputRestDto,
  BlocoFindOneOutputRestDto,
  ImagemFindOneOutputRestDto,
} from "@/server/nest/modules/bloco/rest";

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "AmbienteFindOneOutputDto" })
@RegisterModel({
  name: "AmbienteFindOneOutputDto",
  properties: [
    simpleProperty("id"),
    simpleProperty("nome"),
    simpleProperty("descricao", { nullable: true }),
    simpleProperty("codigo"),
    simpleProperty("capacidade", { nullable: true }),
    simpleProperty("tipo", { nullable: true }),
    referenceProperty("bloco", "BlocoFindOneOutputDto"),
    referenceProperty("imagemCapa", "ImagemFindOneOutputDto", { nullable: true }),
    ...commonProperties.dated,
  ],
})
export class AmbienteFindOneOutputRestDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @IsUUID()
  id: string;

  @ApiProperty({ description: "Nome do ambiente/sala", minLength: 1 })
  @IsString()
  @MinLength(1)
  nome: string;

  @ApiPropertyOptional({ description: "Descricao do ambiente/sala", nullable: true })
  @IsOptional()
  @IsString()
  descricao: string | null;

  @ApiProperty({ description: "Codigo do ambiente/sala", minLength: 1 })
  @IsString()
  @MinLength(1)
  codigo: string;

  @ApiPropertyOptional({ description: "Capacidade do ambiente/sala", nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  capacidade: number | null;

  @ApiPropertyOptional({
    description: "Tipo do ambiente/sala. Ex.: sala aula, auditorio, laboratorio de quimica",
    nullable: true,
  })
  @IsOptional()
  @IsString()
  tipo: string | null;

  @ApiProperty({
    type: () => BlocoFindOneOutputRestDto,
    description: "Bloco que o ambiente/sala pertence",
  })
  @ValidateNested()
  @Type(() => BlocoFindOneOutputRestDto)
  bloco: BlocoFindOneOutputRestDto;

  @ApiPropertyOptional({
    type: () => ImagemFindOneOutputRestDto,
    description: "Imagem de capa do ambiente",
    nullable: true,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ImagemFindOneOutputRestDto)
  imagemCapa: ImagemFindOneOutputRestDto | null;

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
// List Input/Output
// ============================================================================

@ApiSchema({ name: "AmbienteListInputDto" })
export class AmbienteListInputRestDto extends PaginationInputRestDto {
  @ApiPropertyOptional({
    description: "Filtro por ID",
    type: [String],
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  "filter.id"?: string[];

  @ApiPropertyOptional({
    description: "Filtro por ID do Bloco",
    type: [String],
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  "filter.bloco.id"?: string[];

  @ApiPropertyOptional({
    description: "Filtro por ID do Campus do Bloco",
    type: [String],
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  "filter.bloco.campus.id"?: string[];
}

@ApiSchema({ name: "AmbienteListOutputDto" })
export class AmbienteListOutputRestDto {
  @ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" })
  meta: PaginationMetaRestDto;

  @ApiProperty({ type: () => [AmbienteFindOneOutputRestDto], description: "Resultados da busca" })
  data: AmbienteFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@ApiSchema({ name: "AmbienteCreateInputDto" })
export class AmbienteCreateInputRestDto {
  @ApiProperty({ description: "Nome do ambiente/sala", minLength: 1 })
  @IsString()
  @MinLength(1)
  nome: string;

  @ApiPropertyOptional({ description: "Descricao do ambiente/sala", nullable: true })
  @IsOptional()
  @IsString()
  descricao?: string | null;

  @ApiProperty({ description: "Codigo do ambiente/sala", minLength: 1 })
  @IsString()
  @MinLength(1)
  codigo: string;

  @ApiPropertyOptional({ description: "Capacidade do ambiente/sala", nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  capacidade?: number | null;

  @ApiPropertyOptional({
    description: "Tipo do ambiente/sala. Ex.: sala aula, auditorio, laboratorio de quimica",
    nullable: true,
  })
  @IsOptional()
  @IsString()
  tipo?: string | null;

  @ApiProperty({
    type: () => BlocoFindOneInputRestDto,
    description: "Bloco que o ambiente/sala pertence",
  })
  @ValidateNested()
  @Type(() => BlocoFindOneInputRestDto)
  bloco: BlocoFindOneInputRestDto;
}

@ApiSchema({ name: "AmbienteUpdateInputDto" })
export class AmbienteUpdateInputRestDto extends PartialType(AmbienteCreateInputRestDto) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "AmbienteFindOneInputDto" })
export class AmbienteFindOneInputRestDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @IsUUID()
  id: string;
}
