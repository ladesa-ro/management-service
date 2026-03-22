import { NivelFormacaoFindOneOutputRestDto } from "@/modules/ensino/nivel-formacao/presentation.rest";
import {
  ApiProperty,
  ApiPropertyOptional,
  ApiSchema,
  TransformToArray,
} from "@/shared/presentation/rest";
import {
  EntityBaseRestDto,
  PaginatedFilterByIdRestDto,
  PaginationMetaRestDto,
} from "@/shared/presentation/rest/dtos";
import { OfertaFormacaoNivelFormacaoBulkReplaceCommandFields } from "../domain/commands/oferta-formacao-nivel-formacao-bulk-replace.command";
import { OfertaFormacaoNivelFormacaoFindOneQueryResultFields } from "../domain/queries/oferta-formacao-nivel-formacao-find-one.query.result";
import { OfertaFormacaoNivelFormacaoListQueryFields } from "../domain/queries/oferta-formacao-nivel-formacao-list.query";
import { OfertaFormacaoFindOneOutputRestDto } from "./oferta-formacao.rest.dto";

// ============================================================================
// Parent Route Params
// ============================================================================

@ApiSchema({ name: "OfertaFormacaoNivelFormacaoParentParamsDto" })
export class OfertaFormacaoNivelFormacaoParentParamsRestDto {
  @ApiProperty({
    type: "string",
    ...OfertaFormacaoNivelFormacaoBulkReplaceCommandFields.ofertaFormacaoId.swaggerMetadata,
    format: "uuid",
  })
  ofertaFormacaoId: string;
}

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "OfertaFormacaoNivelFormacaoFindOneOutputDto" })
export class OfertaFormacaoNivelFormacaoFindOneOutputRestDto extends EntityBaseRestDto {
  @ApiProperty({
    type: () => NivelFormacaoFindOneOutputRestDto,
    ...OfertaFormacaoNivelFormacaoFindOneQueryResultFields.nivelFormacao.swaggerMetadata,
  })
  nivelFormacao: NivelFormacaoFindOneOutputRestDto;

  @ApiProperty({
    type: () => OfertaFormacaoFindOneOutputRestDto,
    ...OfertaFormacaoNivelFormacaoFindOneQueryResultFields.ofertaFormacao.swaggerMetadata,
  })
  ofertaFormacao: OfertaFormacaoFindOneOutputRestDto;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ApiSchema({ name: "OfertaFormacaoNivelFormacaoListInputDto" })
export class OfertaFormacaoNivelFormacaoListInputRestDto extends PaginatedFilterByIdRestDto {
  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    ...OfertaFormacaoNivelFormacaoListQueryFields.filterNivelFormacaoId.swaggerMetadata,
  })
  @TransformToArray()
  "filter.nivelFormacao.id"?: string[];
}

@ApiSchema({ name: "OfertaFormacaoNivelFormacaoListOutputDto" })
export class OfertaFormacaoNivelFormacaoListOutputRestDto {
  @ApiProperty({
    type: () => PaginationMetaRestDto,
    ...OfertaFormacaoNivelFormacaoListQueryFields.meta.swaggerMetadata,
  })
  meta: PaginationMetaRestDto;

  @ApiProperty({
    type: () => [OfertaFormacaoNivelFormacaoFindOneOutputRestDto],
    ...OfertaFormacaoNivelFormacaoListQueryFields.data.swaggerMetadata,
  })
  data: OfertaFormacaoNivelFormacaoFindOneOutputRestDto[];
}

// ============================================================================
// Bulk Replace Input
// ============================================================================

@ApiSchema({ name: "OfertaFormacaoNivelFormacaoBulkReplaceItemDto" })
export class OfertaFormacaoNivelFormacaoBulkReplaceItemRestDto {
  @ApiProperty({
    type: "string",
    ...OfertaFormacaoNivelFormacaoBulkReplaceCommandFields.nivelFormacaoId.swaggerMetadata,
    format: "uuid",
  })
  nivelFormacaoId: string;
}

@ApiSchema({ name: "OfertaFormacaoNivelFormacaoBulkReplaceInputDto" })
export class OfertaFormacaoNivelFormacaoBulkReplaceInputRestDto {
  @ApiProperty({
    type: () => [OfertaFormacaoNivelFormacaoBulkReplaceItemRestDto],
    ...OfertaFormacaoNivelFormacaoBulkReplaceCommandFields.niveis.swaggerMetadata,
  })
  niveis: OfertaFormacaoNivelFormacaoBulkReplaceItemRestDto[];
}
