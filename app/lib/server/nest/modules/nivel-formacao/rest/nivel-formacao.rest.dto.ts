import { ApiProperty, ApiPropertyOptional, ApiSchema, PartialType } from "@nestjs/swagger";
import { IsArray, IsDateString, IsOptional, IsString, IsUUID, MinLength } from "class-validator";
import {
  commonProperties,
  RegisterModel,
  simpleProperty,
} from "@/modules/@shared/infrastructure/persistence/typeorm/metadata";
import {
  PaginationInputRestDto,
  PaginationMetaRestDto,
  TransformToArray,
} from "@/modules/@shared/infrastructure/presentation/rest/dtos";

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "NivelFormacaoFindOneOutputDto" })
@RegisterModel({
  name: "NivelFormacaoFindOneOutputDto",
  properties: [simpleProperty("id"), simpleProperty("slug"), ...commonProperties.dated],
})
export class NivelFormacaoFindOneOutputRestDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @IsUUID()
  id: string;

  @ApiProperty({ description: "Apelido do nivel de formacao", minLength: 1 })
  @IsString()
  @MinLength(1)
  slug: string;

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

@ApiSchema({ name: "NivelFormacaoListInputDto" })
export class NivelFormacaoListInputRestDto extends PaginationInputRestDto {
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

@ApiSchema({ name: "NivelFormacaoListOutputDto" })
export class NivelFormacaoListOutputRestDto {
  @ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" })
  meta: PaginationMetaRestDto;

  @ApiProperty({
    type: () => [NivelFormacaoFindOneOutputRestDto],
    description: "Resultados da busca",
  })
  data: NivelFormacaoFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@ApiSchema({ name: "NivelFormacaoCreateInputDto" })
export class NivelFormacaoCreateInputRestDto {
  @ApiProperty({ description: "Apelido do nivel de formacao", minLength: 1 })
  @IsString()
  @MinLength(1)
  slug: string;
}

@ApiSchema({ name: "NivelFormacaoUpdateInputDto" })
export class NivelFormacaoUpdateInputRestDto extends PartialType(NivelFormacaoCreateInputRestDto) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "NivelFormacaoFindOneInputDto" })
export class NivelFormacaoFindOneInputRestDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @IsUUID()
  id: string;
}
