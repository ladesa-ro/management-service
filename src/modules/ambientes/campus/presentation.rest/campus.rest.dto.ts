import {
  CampusCreateSchema,
  CampusUpdateSchema,
} from "@/modules/ambientes/campus/domain/campus.schemas";
import { CampusFindOneInputSchema } from "@/modules/ambientes/campus/domain/queries/campus-find-one.query.schemas";
import { CampusPaginationInputSchema } from "@/modules/ambientes/campus/domain/queries/campus-list.query.schemas";
import {
  EnderecoFindOneOutputRestDto,
  EnderecoInputRestDto,
} from "@/modules/localidades/endereco/presentation.rest";
import { ApiProperty, ApiPropertyOptional, ApiSchema } from "@/shared/presentation/rest";
import { EntityBaseRestDto, PaginationMetaRestDto } from "@/shared/presentation/rest/dtos";
import { CampusCreateCommandFields } from "../domain/commands/campus-create.command";
import { CampusUpdateCommandFields } from "../domain/commands/campus-update.command";
import { CampusFindOneQueryResultFields } from "../domain/queries/campus-find-one.query.result";
import { CampusListQueryFields } from "../domain/queries/campus-list.query";

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "CampusFindOneOutputDto" })
export class CampusFindOneOutputRestDto extends EntityBaseRestDto {
  @ApiProperty(CampusFindOneQueryResultFields.nomeFantasia.swaggerMetadata)
  nomeFantasia: string;

  @ApiProperty(CampusFindOneQueryResultFields.razaoSocial.swaggerMetadata)
  razaoSocial: string;

  @ApiProperty(CampusFindOneQueryResultFields.apelido.swaggerMetadata)
  apelido: string;

  @ApiProperty(CampusFindOneQueryResultFields.cnpj.swaggerMetadata)
  cnpj: string;

  @ApiProperty({
    type: () => EnderecoFindOneOutputRestDto,
    ...CampusFindOneQueryResultFields.endereco.swaggerMetadata,
  })
  endereco: EnderecoFindOneOutputRestDto;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ApiSchema({ name: "CampusListInputDto" })
export class CampusListInputRestDto {
  static schema = CampusPaginationInputSchema;

  @ApiPropertyOptional(CampusListQueryFields.page.swaggerMetadata)
  page?: number;

  @ApiPropertyOptional(CampusListQueryFields.limit.swaggerMetadata)
  limit?: number;

  @ApiPropertyOptional(CampusListQueryFields.search.swaggerMetadata)
  search?: string;

  @ApiPropertyOptional(CampusListQueryFields.sortBy.swaggerMetadata)
  sortBy?: string[];

  @ApiPropertyOptional(CampusListQueryFields.filterId.swaggerMetadata)
  "filter.id"?: string[];
}

@ApiSchema({ name: "CampusListOutputDto" })
export class CampusListOutputRestDto {
  @ApiProperty({ type: () => PaginationMetaRestDto, ...CampusListQueryFields.meta.swaggerMetadata })
  meta: PaginationMetaRestDto;

  @ApiProperty({
    type: () => [CampusFindOneOutputRestDto],
    ...CampusListQueryFields.data.swaggerMetadata,
  })
  data: CampusFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@ApiSchema({ name: "CampusCreateInputDto" })
export class CampusCreateInputRestDto {
  static schema = CampusCreateSchema.presentation;

  @ApiProperty(CampusCreateCommandFields.nomeFantasia.swaggerMetadata)
  nomeFantasia: string;

  @ApiProperty(CampusCreateCommandFields.razaoSocial.swaggerMetadata)
  razaoSocial: string;

  @ApiProperty(CampusCreateCommandFields.apelido.swaggerMetadata)
  apelido: string;

  @ApiProperty(CampusCreateCommandFields.cnpj.swaggerMetadata)
  cnpj: string;

  @ApiProperty({
    type: () => EnderecoInputRestDto,
    ...CampusCreateCommandFields.endereco.swaggerMetadata,
  })
  endereco: EnderecoInputRestDto;
}

@ApiSchema({ name: "CampusUpdateInputDto" })
export class CampusUpdateInputRestDto {
  static schema = CampusUpdateSchema.presentation;

  @ApiPropertyOptional(CampusUpdateCommandFields.nomeFantasia.swaggerMetadata)
  nomeFantasia?: string;

  @ApiPropertyOptional(CampusUpdateCommandFields.razaoSocial.swaggerMetadata)
  razaoSocial?: string;

  @ApiPropertyOptional(CampusUpdateCommandFields.apelido.swaggerMetadata)
  apelido?: string;

  @ApiPropertyOptional(CampusUpdateCommandFields.cnpj.swaggerMetadata)
  cnpj?: string;

  @ApiPropertyOptional({
    type: () => EnderecoInputRestDto,
    ...CampusUpdateCommandFields.endereco.swaggerMetadata,
  })
  endereco?: EnderecoInputRestDto;
}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "CampusFindOneInputDto" })
export class CampusFindOneInputRestDto {
  static schema = CampusFindOneInputSchema;

  @ApiProperty(CampusFindOneQueryResultFields.id.swaggerMetadata)
  id: string;
}
