import { ApiProperty, ApiPropertyOptional, ApiSchema, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsOptional, IsUUID, ValidateNested } from "class-validator";
import { decorate, Mixin } from "ts-mixer";
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
  TransformToArray,
} from "@/modules/@shared/infrastructure/presentation/rest/dtos";
import {
  ModalidadeFindOneInputRestDto,
  ModalidadeFindOneOutputRestDto,
} from "@/server/nest/modules/modalidade/rest/modalidade.rest.dto";
import { OfertaFormacaoFieldsMixin } from "@/server/nest/modules/oferta-formacao/oferta-formacao.validation-mixin";

// ============================================================================
// FindOne Output
// ============================================================================

@decorate(ApiSchema({ name: "OfertaFormacaoFindOneOutputDto" }))
@decorate(
  RegisterModel({
    name: "OfertaFormacaoFindOneOutputDto",
    properties: [
      simpleProperty("id"),
      simpleProperty("nome"),
      simpleProperty("slug"),
      referenceProperty("modalidade", "ModalidadeFindOneOutputDto"),
      ...commonProperties.dated,
    ],
  }),
)
export class OfertaFormacaoFindOneOutputRestDto extends Mixin(
  EntityBaseRestDto,
  OfertaFormacaoFieldsMixin,
) {
  @decorate(
    ApiProperty({ type: "string", description: "Nome da oferta de formacao", minLength: 1 }),
  )
  declare nome: string;

  @decorate(
    ApiProperty({ type: "string", description: "Apelido da oferta de formacao", minLength: 1 }),
  )
  declare slug: string;

  @decorate(
    ApiProperty({
      type: () => ModalidadeFindOneOutputRestDto,
      description: "Modalidade da oferta de formacao",
    }),
  )
  @decorate(ValidateNested())
  @decorate(Type(() => ModalidadeFindOneOutputRestDto))
  modalidade: ModalidadeFindOneOutputRestDto;
}

// ============================================================================
// List Input/Output
// ============================================================================

@decorate(ApiSchema({ name: "OfertaFormacaoListInputDto" }))
export class OfertaFormacaoListInputRestDto extends PaginatedFilterByIdRestDto {
  @decorate(
    ApiPropertyOptional({
      type: "string",
      isArray: true,
      description: "Filtro por ID da Modalidade",
    }),
  )
  @decorate(TransformToArray())
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsUUID(undefined, { each: true }))
  "filter.modalidade.id"?: string[];
}

@decorate(ApiSchema({ name: "OfertaFormacaoListOutputDto" }))
export class OfertaFormacaoListOutputRestDto {
  @decorate(ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" }))
  meta: PaginationMetaRestDto;

  @decorate(
    ApiProperty({
      type: () => [OfertaFormacaoFindOneOutputRestDto],
      description: "Resultados da busca",
    }),
  )
  data: OfertaFormacaoFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@decorate(ApiSchema({ name: "OfertaFormacaoCreateInputDto" }))
export class OfertaFormacaoCreateInputRestDto extends OfertaFormacaoFieldsMixin {
  @decorate(
    ApiProperty({ type: "string", description: "Nome da oferta de formacao", minLength: 1 }),
  )
  declare nome: string;

  @decorate(
    ApiProperty({ type: "string", description: "Apelido da oferta de formacao", minLength: 1 }),
  )
  declare slug: string;

  @decorate(
    ApiProperty({
      type: () => ModalidadeFindOneInputRestDto,
      description: "Modalidade da oferta de formacao",
    }),
  )
  @decorate(ValidateNested())
  @decorate(Type(() => ModalidadeFindOneInputRestDto))
  modalidade: ModalidadeFindOneInputRestDto;
}

@decorate(ApiSchema({ name: "OfertaFormacaoUpdateInputDto" }))
export class OfertaFormacaoUpdateInputRestDto extends PartialType(
  OfertaFormacaoCreateInputRestDto,
) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@decorate(ApiSchema({ name: "OfertaFormacaoFindOneInputDto" }))
export class OfertaFormacaoFindOneInputRestDto {
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
