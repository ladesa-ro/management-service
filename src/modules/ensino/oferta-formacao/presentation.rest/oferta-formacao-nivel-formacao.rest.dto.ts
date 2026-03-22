import { NivelFormacaoFindOneOutputRestDto } from "@/modules/ensino/nivel-formacao/presentation.rest";
import {
  ApiProperty,
  ApiPropertyOptional,
  ApiSchema,
  commonProperties,
  RegisterModel,
  referenceProperty,
  simpleProperty,
  TransformToArray,
} from "@/shared/presentation/rest";
import {
  EntityBaseRestDto,
  PaginatedFilterByIdRestDto,
  PaginationMetaRestDto,
} from "@/shared/presentation/rest/dtos";
import { OfertaFormacaoFindOneOutputRestDto } from "./oferta-formacao.rest.dto";

// ============================================================================
// Parent Route Params
// ============================================================================

@ApiSchema({ name: "OfertaFormacaoNivelFormacaoParentParamsDto" })
export class OfertaFormacaoNivelFormacaoParentParamsRestDto {
  @ApiProperty({
    type: "string",
    description: "ID da oferta de formacao (uuid)",
    format: "uuid",
  })
  ofertaFormacaoId: string;
}

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "OfertaFormacaoNivelFormacaoFindOneOutputDto" })
@RegisterModel({
  name: "OfertaFormacaoNivelFormacaoFindOneQueryResult",
  properties: [
    simpleProperty("id"),
    referenceProperty("nivelFormacao", "NivelFormacaoFindOneQueryResult"),
    referenceProperty("ofertaFormacao", "OfertaFormacaoFindOneQueryResult"),
    ...commonProperties.dated,
  ],
})
export class OfertaFormacaoNivelFormacaoFindOneOutputRestDto extends EntityBaseRestDto {
  @ApiProperty({
    type: () => NivelFormacaoFindOneOutputRestDto,
    description: "Nivel de formacao vinculado",
  })
  nivelFormacao: NivelFormacaoFindOneOutputRestDto;

  @ApiProperty({
    type: () => OfertaFormacaoFindOneOutputRestDto,
    description: "Oferta de formacao vinculada",
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
    description: "Filtro por ID do Nivel de Formacao",
  })
  @TransformToArray()
  "filter.nivelFormacao.id"?: string[];
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
// Bulk Replace Input
// ============================================================================

@ApiSchema({ name: "OfertaFormacaoNivelFormacaoBulkReplaceItemDto" })
export class OfertaFormacaoNivelFormacaoBulkReplaceItemRestDto {
  @ApiProperty({ type: "string", description: "ID do nivel de formacao (uuid)", format: "uuid" })
  nivelFormacaoId: string;
}

@ApiSchema({ name: "OfertaFormacaoNivelFormacaoBulkReplaceInputDto" })
export class OfertaFormacaoNivelFormacaoBulkReplaceInputRestDto {
  @ApiProperty({
    type: () => [OfertaFormacaoNivelFormacaoBulkReplaceItemRestDto],
    description: "Lista de niveis de formacao para vincular a oferta de formacao",
  })
  niveis: OfertaFormacaoNivelFormacaoBulkReplaceItemRestDto[];
}
