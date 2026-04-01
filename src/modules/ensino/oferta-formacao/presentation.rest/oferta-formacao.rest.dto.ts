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
import {
  OfertaFormacaoCreateSchema,
  OfertaFormacaoUpdateSchema,
} from "../domain/oferta-formacao.schemas";
import {
  OfertaFormacaoPeriodoEtapaFields,
  OfertaFormacaoPeriodoFields,
} from "../domain/oferta-formacao-periodo.fields";
import { OfertaFormacaoFindOneQueryResultFields } from "../domain/queries/oferta-formacao-find-one.query.result";
import { OfertaFormacaoListQueryFields } from "../domain/queries/oferta-formacao-list.query";

// ============================================================================
// Periodo/Etapa Output
// ============================================================================

@ApiSchema({ name: "OfertaFormacaoPeriodoEtapaOutputDto" })
export class OfertaFormacaoPeriodoEtapaOutputRestDto {
  @ApiProperty(OfertaFormacaoPeriodoEtapaFields.id.swaggerMetadata) id: string;
  @ApiProperty(OfertaFormacaoPeriodoEtapaFields.nome.swaggerMetadata) nome: string;
  @ApiProperty(OfertaFormacaoPeriodoEtapaFields.cor.swaggerMetadata) cor: string;
}

@ApiSchema({ name: "OfertaFormacaoPeriodoOutputDto" })
export class OfertaFormacaoPeriodoOutputRestDto {
  @ApiProperty(OfertaFormacaoPeriodoFields.id.swaggerMetadata) id: string;
  @ApiProperty(OfertaFormacaoPeriodoFields.numeroPeriodo.swaggerMetadata) numeroPeriodo: number;
  @ApiProperty({
    type: () => [OfertaFormacaoPeriodoEtapaOutputRestDto],
    ...OfertaFormacaoPeriodoFields.etapas.swaggerMetadata,
  })
  etapas: OfertaFormacaoPeriodoEtapaOutputRestDto[];
}

// ============================================================================
// Periodo/Etapa Input
// ============================================================================

@ApiSchema({ name: "OfertaFormacaoPeriodoEtapaInputDto" })
export class OfertaFormacaoPeriodoEtapaInputRestDto {
  @ApiProperty(OfertaFormacaoPeriodoEtapaFields.nome.swaggerMetadata) nome: string;
  @ApiProperty(OfertaFormacaoPeriodoEtapaFields.cor.swaggerMetadata) cor: string;
}

@ApiSchema({ name: "OfertaFormacaoPeriodoInputDto" })
export class OfertaFormacaoPeriodoInputRestDto {
  @ApiProperty(OfertaFormacaoPeriodoFields.numeroPeriodo.swaggerMetadata)
  numeroPeriodo: number;

  @ApiProperty({
    type: () => [OfertaFormacaoPeriodoEtapaInputRestDto],
    ...OfertaFormacaoPeriodoFields.etapas.swaggerMetadata,
  })
  etapas: OfertaFormacaoPeriodoEtapaInputRestDto[];
}

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "OfertaFormacaoFindOneOutputDto" })
export class OfertaFormacaoFindOneOutputRestDto extends EntityBaseRestDto {
  @ApiProperty(OfertaFormacaoFindOneQueryResultFields.nome.swaggerMetadata)
  nome: string;

  @ApiProperty(OfertaFormacaoFindOneQueryResultFields.slug.swaggerMetadata)
  slug: string;

  @ApiProperty(OfertaFormacaoFindOneQueryResultFields.duracaoPeriodoEmMeses.swaggerMetadata)
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

  @ApiPropertyOptional(OfertaFormacaoListQueryFields.filterModalidadeId.swaggerMetadata)
  @TransformToArray()
  "filter.modalidade.id"?: string[];

  @ApiPropertyOptional(OfertaFormacaoListQueryFields.filterCampusId.swaggerMetadata)
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

  @ApiProperty(OfertaFormacaoCreateCommandFields.nome.swaggerMetadata)
  nome: string;

  @ApiProperty(OfertaFormacaoCreateCommandFields.slug.swaggerMetadata)
  slug: string;

  @ApiProperty(OfertaFormacaoCreateCommandFields.duracaoPeriodoEmMeses.swaggerMetadata)
  duracaoPeriodoEmMeses: number;

  @ApiProperty(OfertaFormacaoCreateCommandFields.modalidade.swaggerMetadata)
  modalidade: { id: string };

  @ApiProperty(OfertaFormacaoCreateCommandFields.campus.swaggerMetadata)
  campus: { id: string };

  @ApiProperty(OfertaFormacaoCreateCommandFields.niveisFormacoes.swaggerMetadata)
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
) {
  static readonly schema = OfertaFormacaoUpdateSchema.presentation;
}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "OfertaFormacaoFindOneInputDto" })
export class OfertaFormacaoFindOneInputRestDto {
  static readonly schema = OfertaFormacaoFindOneInputSchema;

  @ApiProperty(OfertaFormacaoFindOneQueryResultFields.id.swaggerMetadata)
  id: string;
}
