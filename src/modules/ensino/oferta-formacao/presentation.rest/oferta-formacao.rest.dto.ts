import { CampusFindOneOutputRestDto } from "@/modules/ambientes/campus/presentation.rest/campus.rest.dto";
import { ModalidadeFindOneOutputRestDto } from "@/modules/ensino/modalidade/presentation.rest/modalidade.rest.dto";
import { NivelFormacaoFindOneOutputRestDto } from "@/modules/ensino/nivel-formacao/presentation.rest/nivel-formacao.rest.dto";
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
// Periodo/Etapa Output
// ============================================================================

@ApiSchema({ name: "OfertaFormacaoPeriodoEtapaOutputDto" })
export class OfertaFormacaoPeriodoEtapaOutputRestDto {
  @ApiProperty({ type: "string" }) id: string;
  @ApiProperty({ type: "string" }) nome: string;
  @ApiProperty({ type: "string" }) cor: string;
}

@ApiSchema({ name: "OfertaFormacaoPeriodoOutputDto" })
export class OfertaFormacaoPeriodoOutputRestDto {
  @ApiProperty({ type: "string" }) id: string;
  @ApiProperty({ type: "integer" }) numeroPeriodo: number;
  @ApiProperty({ type: () => [OfertaFormacaoPeriodoEtapaOutputRestDto] })
  etapas: OfertaFormacaoPeriodoEtapaOutputRestDto[];
}

// ============================================================================
// Periodo/Etapa Input
// ============================================================================

@ApiSchema({ name: "OfertaFormacaoPeriodoEtapaInputDto" })
export class OfertaFormacaoPeriodoEtapaInputRestDto {
  @ApiProperty({ type: "string", description: "Nome da etapa" }) nome: string;
  @ApiProperty({ type: "string", description: "Cor da etapa (hex)" }) cor: string;
}

@ApiSchema({ name: "OfertaFormacaoPeriodoInputDto" })
export class OfertaFormacaoPeriodoInputRestDto {
  @ApiProperty({ type: "integer", description: "Numero do periodo", minimum: 1 })
  numeroPeriodo: number;

  @ApiProperty({
    type: () => [OfertaFormacaoPeriodoEtapaInputRestDto],
    description: "Etapas do periodo (ao menos 1)",
  })
  etapas: OfertaFormacaoPeriodoEtapaInputRestDto[];
}

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

  @ApiProperty({
    type: Number,
    ...OfertaFormacaoFindOneQueryResultFields.duracaoPeriodoEmMeses.swaggerMetadata,
  })
  duracaoPeriodoEmMeses: number;

  @ApiProperty({
    type: () => ModalidadeFindOneOutputRestDto,
    ...OfertaFormacaoFindOneQueryResultFields.modalidade.swaggerMetadata,
  })
  modalidade: ModalidadeFindOneOutputRestDto;

  @ApiProperty({
    type: () => CampusFindOneOutputRestDto,
    ...OfertaFormacaoFindOneQueryResultFields.campus.swaggerMetadata,
  })
  campus: CampusFindOneOutputRestDto;

  @ApiProperty({
    type: () => [NivelFormacaoFindOneOutputRestDto],
    ...OfertaFormacaoFindOneQueryResultFields.niveisFormacoes.swaggerMetadata,
  })
  niveisFormacoes: NivelFormacaoFindOneOutputRestDto[];

  @ApiProperty({
    type: () => [OfertaFormacaoPeriodoOutputRestDto],
    ...OfertaFormacaoFindOneQueryResultFields.periodos.swaggerMetadata,
  })
  periodos: OfertaFormacaoPeriodoOutputRestDto[];
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

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    ...OfertaFormacaoListQueryFields.filterCampusId.swaggerMetadata,
  })
  @TransformToArray()
  "filter.campus.id"?: string[];
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
  static readonly schema = OfertaFormacaoCreateSchema.presentation;

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

  @ApiProperty({
    type: Number,
    ...OfertaFormacaoCreateCommandFields.duracaoPeriodoEmMeses.swaggerMetadata,
  })
  duracaoPeriodoEmMeses: number;

  @ApiProperty({
    type: "object",
    ...OfertaFormacaoCreateCommandFields.modalidade.swaggerMetadata,
    properties: { id: { type: "string", format: "uuid" } },
  })
  modalidade: { id: string };

  @ApiProperty({
    type: "object",
    ...OfertaFormacaoCreateCommandFields.campus.swaggerMetadata,
    properties: { id: { type: "string", format: "uuid" } },
  })
  campus: { id: string };

  @ApiProperty({
    type: "array",
    ...OfertaFormacaoCreateCommandFields.niveisFormacoes.swaggerMetadata,
    items: { type: "object", properties: { id: { type: "string", format: "uuid" } } },
  })
  niveisFormacoes: Array<{ id: string }>;

  @ApiProperty({
    type: () => [OfertaFormacaoPeriodoInputRestDto],
    ...OfertaFormacaoCreateCommandFields.periodos.swaggerMetadata,
  })
  periodos: OfertaFormacaoPeriodoInputRestDto[];
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
