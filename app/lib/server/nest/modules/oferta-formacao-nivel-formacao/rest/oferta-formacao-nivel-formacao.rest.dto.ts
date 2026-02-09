import { ApiProperty, ApiPropertyOptional, ApiSchema, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsDateString, IsOptional, IsUUID, ValidateNested } from "class-validator";
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
  NivelFormacaoFindOneInputRestDto,
  NivelFormacaoFindOneOutputRestDto,
} from "@/server/nest/modules/nivel-formacao/rest/nivel-formacao.rest.dto";
import {
  OfertaFormacaoFindOneInputRestDto,
  OfertaFormacaoFindOneOutputRestDto,
} from "@/server/nest/modules/oferta-formacao/rest/oferta-formacao.rest.dto";

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "OfertaFormacaoNivelFormacaoFindOneOutputDto" })
@RegisterModel({
  name: "OfertaFormacaoNivelFormacaoFindOneOutputDto",
  properties: [
    simpleProperty("id"),
    referenceProperty("ofertaFormacao", "OfertaFormacaoFindOneOutputDto"),
    referenceProperty("nivelFormacao", "NivelFormacaoFindOneOutputDto"),
    ...commonProperties.dated,
  ],
})
export class OfertaFormacaoNivelFormacaoFindOneOutputRestDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @IsUUID()
  id: string;

  @ApiProperty({
    type: () => OfertaFormacaoFindOneOutputRestDto,
    description: "Oferta de formacao",
  })
  @ValidateNested()
  @Type(() => OfertaFormacaoFindOneOutputRestDto)
  ofertaFormacao: OfertaFormacaoFindOneOutputRestDto;

  @ApiProperty({ type: () => NivelFormacaoFindOneOutputRestDto, description: "Nivel de formacao" })
  @ValidateNested()
  @Type(() => NivelFormacaoFindOneOutputRestDto)
  nivelFormacao: NivelFormacaoFindOneOutputRestDto;

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

@ApiSchema({ name: "OfertaFormacaoNivelFormacaoListInputDto" })
export class OfertaFormacaoNivelFormacaoListInputRestDto extends PaginationInputRestDto {
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

@ApiSchema({ name: "OfertaFormacaoNivelFormacaoListOutputDto" })
export class OfertaFormacaoNivelFormacaoListOutputRestDto {
  @ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" })
  meta: PaginationMetaRestDto;

  @ApiProperty({
    type: () => [OfertaFormacaoNivelFormacaoFindOneOutputRestDto],
    description: "Resultados da busca",
  })
  data: OfertaFormacaoNivelFormacaoFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@ApiSchema({ name: "OfertaFormacaoNivelFormacaoCreateInputDto" })
export class OfertaFormacaoNivelFormacaoCreateInputRestDto {
  @ApiProperty({ type: () => OfertaFormacaoFindOneInputRestDto, description: "Oferta de formacao" })
  @ValidateNested()
  @Type(() => OfertaFormacaoFindOneInputRestDto)
  ofertaFormacao: OfertaFormacaoFindOneInputRestDto;

  @ApiProperty({ type: () => NivelFormacaoFindOneInputRestDto, description: "Nivel de formacao" })
  @ValidateNested()
  @Type(() => NivelFormacaoFindOneInputRestDto)
  nivelFormacao: NivelFormacaoFindOneInputRestDto;
}

@ApiSchema({ name: "OfertaFormacaoNivelFormacaoUpdateInputDto" })
export class OfertaFormacaoNivelFormacaoUpdateInputRestDto extends PartialType(
  OfertaFormacaoNivelFormacaoCreateInputRestDto,
) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "OfertaFormacaoNivelFormacaoFindOneInputDto" })
export class OfertaFormacaoNivelFormacaoFindOneInputRestDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @IsUUID()
  id: string;
}
