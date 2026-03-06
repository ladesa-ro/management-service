import { ApiProperty, ApiSchema, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsUUID, ValidateNested } from "class-validator";
import { decorate } from "ts-mixer";
import {
  EntityBaseRestDto,
  PaginatedFilterByIdRestDto,
  PaginationMetaRestDto,
} from "@/Ladesa.Management.Application/@shared/infrastructure/presentation/rest/dtos";
import {
  CampusFindOneInputRestDto,
  CampusFindOneOutputRestDto,
} from "@/Ladesa.Management.Application/ambientes/campus/presentation/rest";
import {
  OfertaFormacaoFindOneInputRestDto,
  OfertaFormacaoFindOneOutputRestDto,
} from "@/Ladesa.Management.Application/ensino/oferta-formacao/presentation/rest";
import {
  commonProperties,
  RegisterModel,
  referenceProperty,
  simpleProperty,
} from "@/Ladesa.Management.Infrastructure.Database/typeorm/metadata";

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
