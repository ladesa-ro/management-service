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
  NivelFormacaoFindOneInputRestDto,
  NivelFormacaoFindOneOutputRestDto,
} from "@/modules/ensino/nivel-formacao/presentation/rest/nivel-formacao.rest.dto";
import {
  OfertaFormacaoFindOneInputRestDto,
  OfertaFormacaoFindOneOutputRestDto,
} from "@/modules/ensino/oferta-formacao/presentation/rest/oferta-formacao.rest.dto";

// ============================================================================
// FindOne Output
// ============================================================================

@decorate(ApiSchema({ name: "OfertaFormacaoNivelFormacaoFindOneOutputDto" }))
@decorate(
  RegisterModel({
    name: "OfertaFormacaoNivelFormacaoFindOneOutputDto",
    properties: [
      simpleProperty("id"),
      referenceProperty("ofertaFormacao", "OfertaFormacaoFindOneOutputDto"),
      referenceProperty("nivelFormacao", "NivelFormacaoFindOneOutputDto"),
      ...commonProperties.dated,
    ],
  }),
)
export class OfertaFormacaoNivelFormacaoFindOneOutputRestDto extends EntityBaseRestDto {
  @decorate(
    ApiProperty({
      type: () => OfertaFormacaoFindOneOutputRestDto,
      description: "Oferta de formacao",
    }),
  )
  @decorate(ValidateNested())
  @decorate(Type(() => OfertaFormacaoFindOneOutputRestDto))
  ofertaFormacao: OfertaFormacaoFindOneOutputRestDto;

  @decorate(
    ApiProperty({
      type: () => NivelFormacaoFindOneOutputRestDto,
      description: "Nivel de formacao",
    }),
  )
  @decorate(ValidateNested())
  @decorate(Type(() => NivelFormacaoFindOneOutputRestDto))
  nivelFormacao: NivelFormacaoFindOneOutputRestDto;
}

// ============================================================================
// List Input/Output
// ============================================================================

@decorate(ApiSchema({ name: "OfertaFormacaoNivelFormacaoListInputDto" }))
export class OfertaFormacaoNivelFormacaoListInputRestDto extends PaginatedFilterByIdRestDto {}

@decorate(ApiSchema({ name: "OfertaFormacaoNivelFormacaoListOutputDto" }))
export class OfertaFormacaoNivelFormacaoListOutputRestDto {
  @decorate(ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" }))
  meta: PaginationMetaRestDto;

  @decorate(
    ApiProperty({
      type: () => [OfertaFormacaoNivelFormacaoFindOneOutputRestDto],
      description: "Resultados da busca",
    }),
  )
  data: OfertaFormacaoNivelFormacaoFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@decorate(ApiSchema({ name: "OfertaFormacaoNivelFormacaoCreateInputDto" }))
export class OfertaFormacaoNivelFormacaoCreateInputRestDto {
  @decorate(
    ApiProperty({
      type: () => OfertaFormacaoFindOneInputRestDto,
      description: "Oferta de formacao",
    }),
  )
  @decorate(ValidateNested())
  @decorate(Type(() => OfertaFormacaoFindOneInputRestDto))
  ofertaFormacao: OfertaFormacaoFindOneInputRestDto;

  @decorate(
    ApiProperty({ type: () => NivelFormacaoFindOneInputRestDto, description: "Nivel de formacao" }),
  )
  @decorate(ValidateNested())
  @decorate(Type(() => NivelFormacaoFindOneInputRestDto))
  nivelFormacao: NivelFormacaoFindOneInputRestDto;
}

@decorate(ApiSchema({ name: "OfertaFormacaoNivelFormacaoUpdateInputDto" }))
export class OfertaFormacaoNivelFormacaoUpdateInputRestDto extends PartialType(
  OfertaFormacaoNivelFormacaoCreateInputRestDto,
) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@decorate(ApiSchema({ name: "OfertaFormacaoNivelFormacaoFindOneInputDto" }))
export class OfertaFormacaoNivelFormacaoFindOneInputRestDto {
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
