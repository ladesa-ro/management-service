import { ModalidadeFindOneOutputRestDto } from "@/modules/ensino/modalidade/presentation.rest/modalidade.rest.dto";
import { OfertaFormacaoFindOneInputSchema } from "@/modules/ensino/oferta-formacao/domain/queries/oferta-formacao-find-one.query.schemas";
import { OfertaFormacaoPaginationInputSchema } from "@/modules/ensino/oferta-formacao/domain/queries/oferta-formacao-list.query.schemas";
import {
  ApiProperty,
  ApiPropertyOptional,
  ApiSchema,
  PartialType,
  TransformToArray,
} from "@/shared/presentation/rest";
import {
  EntityBaseRestDto,
  PaginatedFilterByIdRestDto,
  PaginationMetaRestDto,
} from "@/shared/presentation/rest/dtos";
import { OfertaFormacaoCreateCommandFields } from "../domain/commands/oferta-formacao-create.command";
import { OfertaFormacaoCreateSchema } from "../domain/oferta-formacao.schemas";
import { OfertaFormacaoFindOneQueryResultFields } from "../domain/queries/oferta-formacao-find-one.query.result";
import { OfertaFormacaoListQueryFields } from "../domain/queries/oferta-formacao-list.query";

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "OfertaFormacaoFindOneOutputDto" })
export class OfertaFormacaoFindOneOutputRestDto extends EntityBaseRestDto {
  @ApiProperty({
    type: "string",
    ...OfertaFormacaoFindOneQueryResultFields.nome.swaggerMetadata,
    minLength: 1,
  })
  nome: string;

  @ApiProperty({
    type: "string",
    ...OfertaFormacaoFindOneQueryResultFields.slug.swaggerMetadata,
    minLength: 1,
  })
  slug: string;

  @ApiPropertyOptional({
    type: Number,
    ...OfertaFormacaoFindOneQueryResultFields.duracaoPeriodoEmMeses.swaggerMetadata,
    nullable: true,
  })
  duracaoPeriodoEmMeses: number | null;

  @ApiProperty({
    type: () => ModalidadeFindOneOutputRestDto,
    ...OfertaFormacaoFindOneQueryResultFields.modalidade.swaggerMetadata,
  })
  modalidade: ModalidadeFindOneOutputRestDto;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ApiSchema({ name: "OfertaFormacaoListInputDto" })
export class OfertaFormacaoListInputRestDto extends PaginatedFilterByIdRestDto {
  static schema = OfertaFormacaoPaginationInputSchema;

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    ...OfertaFormacaoListQueryFields.filterModalidadeId.swaggerMetadata,
  })
  @TransformToArray()
  "filter.modalidade.id"?: string[];
}

@ApiSchema({ name: "OfertaFormacaoListOutputDto" })
export class OfertaFormacaoListOutputRestDto {
  @ApiProperty({
    type: () => PaginationMetaRestDto,
    ...OfertaFormacaoListQueryFields.meta.swaggerMetadata,
  })
  meta: PaginationMetaRestDto;

  @ApiProperty({
    type: () => [OfertaFormacaoFindOneOutputRestDto],
    ...OfertaFormacaoListQueryFields.data.swaggerMetadata,
  })
  data: OfertaFormacaoFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@ApiSchema({ name: "OfertaFormacaoCreateInputDto" })
export class OfertaFormacaoCreateInputRestDto {
  static readonly schema = OfertaFormacaoCreateSchema;

  @ApiProperty({
    type: "string",
    ...OfertaFormacaoCreateCommandFields.nome.swaggerMetadata,
    minLength: 1,
  })
  nome: string;

  @ApiProperty({
    type: "string",
    ...OfertaFormacaoCreateCommandFields.slug.swaggerMetadata,
    minLength: 1,
  })
  slug: string;

  @ApiPropertyOptional({
    type: Number,
    ...OfertaFormacaoCreateCommandFields.duracaoPeriodoEmMeses.swaggerMetadata,
    nullable: true,
  })
  duracaoPeriodoEmMeses?: number | null;

  @ApiProperty({
    type: "object",
    ...OfertaFormacaoCreateCommandFields.modalidade.swaggerMetadata,
    properties: { id: { type: "string", format: "uuid" } },
  })
  modalidade: { id: string };
}

@ApiSchema({ name: "OfertaFormacaoUpdateInputDto" })
export class OfertaFormacaoUpdateInputRestDto extends PartialType(
  OfertaFormacaoCreateInputRestDto,
) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "OfertaFormacaoFindOneInputDto" })
export class OfertaFormacaoFindOneInputRestDto {
  static readonly schema = OfertaFormacaoFindOneInputSchema;

  @ApiProperty({
    type: "string",
    ...OfertaFormacaoFindOneQueryResultFields.id.swaggerMetadata,
    format: "uuid",
  })
  id: string;
}
