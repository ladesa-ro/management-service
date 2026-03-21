import {
  EntityBaseRestDto,
  PaginatedFilterByIdRestDto,
  PaginationMetaRestDto,
} from "@/modules/@shared/infrastructure/presentation/rest/dtos";
import {
  ApiProperty,
  ApiPropertyOptional,
  ApiSchema,
  commonProperties,
  RegisterModel,
  referenceProperty,
  simpleProperty,
  TransformToArray,
} from "@/modules/@shared/presentation/rest";
import {
  IsArray,
  IsOptional,
  IsUUID,
  Type,
  ValidateNested,
} from "@/modules/@shared/presentation/shared";
import { NivelFormacaoFindOneOutputRestDto } from "@/modules/ensino/nivel-formacao/presentation.rest";
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
  @IsUUID()
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
  @ValidateNested()
  @Type(() => NivelFormacaoFindOneOutputRestDto)
  nivelFormacao: NivelFormacaoFindOneOutputRestDto;

  @ApiProperty({
    type: () => OfertaFormacaoFindOneOutputRestDto,
    description: "Oferta de formacao vinculada",
  })
  @ValidateNested()
  @Type(() => OfertaFormacaoFindOneOutputRestDto)
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
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
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
  @IsUUID()
  nivelFormacaoId: string;
}

@ApiSchema({ name: "OfertaFormacaoNivelFormacaoBulkReplaceInputDto" })
export class OfertaFormacaoNivelFormacaoBulkReplaceInputRestDto {
  @ApiProperty({
    type: () => [OfertaFormacaoNivelFormacaoBulkReplaceItemRestDto],
    description: "Lista de niveis de formacao para vincular a oferta de formacao",
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OfertaFormacaoNivelFormacaoBulkReplaceItemRestDto)
  niveis: OfertaFormacaoNivelFormacaoBulkReplaceItemRestDto[];
}
