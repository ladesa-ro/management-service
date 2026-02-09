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
  CampusFindOneInputRestDto,
  CampusFindOneOutputRestDto,
} from "@/server/nest/modules/campus/rest";
import {
  OfertaFormacaoFindOneInputRestDto,
  OfertaFormacaoFindOneOutputRestDto,
} from "@/server/nest/modules/oferta-formacao/rest";

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "GradeHorarioOfertaFormacaoFindOneOutputDto" })
@RegisterModel({
  name: "GradeHorarioOfertaFormacaoFindOneOutputDto",
  properties: [
    simpleProperty("id"),
    referenceProperty("campus", "CampusFindOneOutputDto"),
    referenceProperty("ofertaFormacao", "OfertaFormacaoFindOneOutputDto"),
    ...commonProperties.dated,
  ],
})
export class GradeHorarioOfertaFormacaoFindOneOutputRestDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @IsUUID()
  id: string;

  @ApiProperty({ type: () => CampusFindOneOutputRestDto, description: "Campus da grade horaria" })
  @ValidateNested()
  @Type(() => CampusFindOneOutputRestDto)
  campus: CampusFindOneOutputRestDto;

  @ApiProperty({
    type: () => OfertaFormacaoFindOneOutputRestDto,
    description: "Oferta de formacao da grade horaria",
  })
  @ValidateNested()
  @Type(() => OfertaFormacaoFindOneOutputRestDto)
  ofertaFormacao: OfertaFormacaoFindOneOutputRestDto;

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

@ApiSchema({ name: "GradeHorarioOfertaFormacaoListInputDto" })
export class GradeHorarioOfertaFormacaoListInputRestDto extends PaginationInputRestDto {
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

@ApiSchema({ name: "GradeHorarioOfertaFormacaoListOutputDto" })
export class GradeHorarioOfertaFormacaoListOutputRestDto {
  @ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" })
  meta: PaginationMetaRestDto;

  @ApiProperty({
    type: () => [GradeHorarioOfertaFormacaoFindOneOutputRestDto],
    description: "Resultados da busca",
  })
  data: GradeHorarioOfertaFormacaoFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@ApiSchema({ name: "GradeHorarioOfertaFormacaoCreateInputDto" })
export class GradeHorarioOfertaFormacaoCreateInputRestDto {
  @ApiProperty({ type: () => CampusFindOneInputRestDto, description: "Campus da grade horaria" })
  @ValidateNested()
  @Type(() => CampusFindOneInputRestDto)
  campus: CampusFindOneInputRestDto;

  @ApiProperty({
    type: () => OfertaFormacaoFindOneInputRestDto,
    description: "Oferta de formacao da grade horaria",
  })
  @ValidateNested()
  @Type(() => OfertaFormacaoFindOneInputRestDto)
  ofertaFormacao: OfertaFormacaoFindOneInputRestDto;
}

@ApiSchema({ name: "GradeHorarioOfertaFormacaoUpdateInputDto" })
export class GradeHorarioOfertaFormacaoUpdateInputRestDto extends PartialType(
  GradeHorarioOfertaFormacaoCreateInputRestDto,
) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "GradeHorarioOfertaFormacaoFindOneInputDto" })
export class GradeHorarioOfertaFormacaoFindOneInputRestDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @IsUUID()
  id: string;
}
