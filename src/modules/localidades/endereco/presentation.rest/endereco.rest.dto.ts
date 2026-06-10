import { SharedFields } from "@/domain/abstractions";
import {
  CidadeFindOneInputRestDto,
  CidadeFindOneOutputRestDto,
} from "@/modules/localidades/cidade/presentation.rest/cidade.rest.dto";
import { EnderecoFields } from "@/modules/localidades/endereco/domain/endereco.fields";
import { EnderecoInputSchema } from "@/modules/localidades/endereco/domain/endereco.schemas";
import { EnderecoFindOneInputSchema } from "@/modules/localidades/endereco/domain/queries/endereco-find-one.query.schemas";
import { EnderecoListQueryFields } from "@/modules/localidades/endereco/domain/queries/endereco-list.query";
import { EnderecoPaginationInputSchema } from "@/modules/localidades/endereco/domain/queries/endereco-list.query.schemas";
import { ApiProperty, ApiPropertyOptional, ApiSchema } from "@/shared/presentation/rest";
import { EntityBaseRestDto, PaginationMetaRestDto } from "@/shared/presentation/rest/dtos";

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "EnderecoFindOneOutputDto" })
export class EnderecoFindOneOutputRestDto extends EntityBaseRestDto {
  @ApiProperty(EnderecoFields.cep.swaggerMetadata)
  declare cep: string;

  @ApiProperty(EnderecoFields.logradouro.swaggerMetadata)
  declare logradouro: string;

  @ApiProperty(EnderecoFields.numero.swaggerMetadata)
  declare numero: number;

  @ApiProperty(EnderecoFields.bairro.swaggerMetadata)
  declare bairro: string;

  @ApiPropertyOptional(EnderecoFields.complemento.swaggerMetadata)
  declare complemento: string | null;

  @ApiPropertyOptional(EnderecoFields.pontoReferencia.swaggerMetadata)
  declare pontoReferencia: string | null;

  @ApiProperty({
    ...EnderecoFields.cidade.swaggerMetadata,
    type: () => CidadeFindOneOutputRestDto,
  })
  cidade: CidadeFindOneOutputRestDto;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ApiSchema({ name: "EnderecoListInputDto" })
export class EnderecoListInputRestDto {
  static schema = EnderecoPaginationInputSchema;

  @ApiPropertyOptional(EnderecoListQueryFields.page.swaggerMetadata)
  page?: number;

  @ApiPropertyOptional(EnderecoListQueryFields.limit.swaggerMetadata)
  limit?: number;

  @ApiPropertyOptional(EnderecoListQueryFields.search.swaggerMetadata)
  search?: string;

  @ApiPropertyOptional(EnderecoListQueryFields.sortBy.swaggerMetadata)
  sortBy?: string[];

  @ApiPropertyOptional(EnderecoListQueryFields.filterId.swaggerMetadata)
  "filter.id"?: string[];
}

@ApiSchema({ name: "EnderecoListOutputDto" })
export class EnderecoListOutputRestDto {
  @ApiProperty({ ...EnderecoListQueryFields.meta.swaggerMetadata, type: () => PaginationMetaRestDto })
  meta: PaginationMetaRestDto;

  @ApiProperty({
    ...EnderecoListQueryFields.data.swaggerMetadata,
    type: () => [EnderecoFindOneOutputRestDto],
  })
  data: EnderecoFindOneOutputRestDto[];
}

// ============================================================================
// Input (for create/update with nested city reference)
// ============================================================================

@ApiSchema({ name: "EnderecoInputDto" })
export class EnderecoInputRestDto {
  static schema = EnderecoInputSchema.presentation;

  @ApiProperty(EnderecoFields.cep.swaggerMetadata)
  declare cep: string;

  @ApiProperty(EnderecoFields.logradouro.swaggerMetadata)
  declare logradouro: string;

  @ApiProperty(EnderecoFields.numero.swaggerMetadata)
  declare numero: number;

  @ApiProperty(EnderecoFields.bairro.swaggerMetadata)
  declare bairro: string;

  @ApiPropertyOptional(EnderecoFields.complemento.swaggerMetadata)
  declare complemento: string | null;

  @ApiPropertyOptional(EnderecoFields.pontoReferencia.swaggerMetadata)
  declare pontoReferencia: string | null;

  @ApiProperty({
    ...EnderecoFields.cidade.swaggerMetadata,
    type: () => CidadeFindOneInputRestDto,
  })
  cidade: CidadeFindOneInputRestDto;
}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "EnderecoFindOneInputDto" })
export class EnderecoFindOneInputRestDto {
  static schema = EnderecoFindOneInputSchema;

  @ApiProperty(SharedFields.idUuid.swaggerMetadata)
  id: string;
}
