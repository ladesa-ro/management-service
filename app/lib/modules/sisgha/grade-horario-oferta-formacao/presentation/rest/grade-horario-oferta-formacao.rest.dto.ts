import { ApiProperty, ApiSchema, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsUUID, ValidateNested } from "class-validator";
import { decorate } from "ts-mixer";
import {
  commonProperties,
  RegisterModel,
  referenceProperty,
  simpleProperty,
} from "@/modules/@shared/infrastructure/persistence/typeorm/metadata";
import {
  EntityBaseRestDto,
  PaginatedFilterByIdRestDto,
  PaginationMetaRestDto,
} from "@/modules/@shared/infrastructure/presentation/rest/dtos";
import {
  OfertaFormacaoFindOneInputRestDto,
  OfertaFormacaoFindOneOutputRestDto,
} from "@/modules/ensino/oferta-formacao/presentation/rest";
import {
  CampusFindOneInputRestDto,
  CampusFindOneOutputRestDto,
} from "@/modules/sisgea/campus/presentation/rest";

// ============================================================================
// FindOne Output
// ============================================================================

@decorate(ApiSchema({ name: "GradeHorarioOfertaFormacaoFindOneOutputDto" }))
@decorate(
  RegisterModel({
    name: "GradeHorarioOfertaFormacaoFindOneOutputDto",
    properties: [
      simpleProperty("id"),
      referenceProperty("campus", "CampusFindOneOutputDto"),
      referenceProperty("ofertaFormacao", "OfertaFormacaoFindOneOutputDto"),
      ...commonProperties.dated,
    ],
  }),
)
export class GradeHorarioOfertaFormacaoFindOneOutputRestDto extends EntityBaseRestDto {
  @decorate(
    ApiProperty({ type: () => CampusFindOneOutputRestDto, description: "Campus da grade horaria" }),
  )
  @decorate(ValidateNested())
  @decorate(Type(() => CampusFindOneOutputRestDto))
  campus: CampusFindOneOutputRestDto;

  @decorate(
    ApiProperty({
      type: () => OfertaFormacaoFindOneOutputRestDto,
      description: "Oferta de formacao da grade horaria",
    }),
  )
  @decorate(ValidateNested())
  @decorate(Type(() => OfertaFormacaoFindOneOutputRestDto))
  ofertaFormacao: OfertaFormacaoFindOneOutputRestDto;
}

// ============================================================================
// List Input/Output
// ============================================================================

@decorate(ApiSchema({ name: "GradeHorarioOfertaFormacaoListInputDto" }))
export class GradeHorarioOfertaFormacaoListInputRestDto extends PaginatedFilterByIdRestDto {}

@decorate(ApiSchema({ name: "GradeHorarioOfertaFormacaoListOutputDto" }))
export class GradeHorarioOfertaFormacaoListOutputRestDto {
  @decorate(ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" }))
  meta: PaginationMetaRestDto;

  @decorate(
    ApiProperty({
      type: () => [GradeHorarioOfertaFormacaoFindOneOutputRestDto],
      description: "Resultados da busca",
    }),
  )
  data: GradeHorarioOfertaFormacaoFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@decorate(ApiSchema({ name: "GradeHorarioOfertaFormacaoCreateInputDto" }))
export class GradeHorarioOfertaFormacaoCreateInputRestDto {
  @decorate(
    ApiProperty({ type: () => CampusFindOneInputRestDto, description: "Campus da grade horaria" }),
  )
  @decorate(ValidateNested())
  @decorate(Type(() => CampusFindOneInputRestDto))
  campus: CampusFindOneInputRestDto;

  @decorate(
    ApiProperty({
      type: () => OfertaFormacaoFindOneInputRestDto,
      description: "Oferta de formacao da grade horaria",
    }),
  )
  @decorate(ValidateNested())
  @decorate(Type(() => OfertaFormacaoFindOneInputRestDto))
  ofertaFormacao: OfertaFormacaoFindOneInputRestDto;
}

@decorate(ApiSchema({ name: "GradeHorarioOfertaFormacaoUpdateInputDto" }))
export class GradeHorarioOfertaFormacaoUpdateInputRestDto extends PartialType(
  GradeHorarioOfertaFormacaoCreateInputRestDto,
) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@decorate(ApiSchema({ name: "GradeHorarioOfertaFormacaoFindOneInputDto" }))
export class GradeHorarioOfertaFormacaoFindOneInputRestDto {
  @decorate(
    ApiProperty({
      type: "string",
      description: "Identificador do registro (uuid)",
      format: "uuid",
    }),
  )
  @decorate(IsUUID())
  id: string;
}
