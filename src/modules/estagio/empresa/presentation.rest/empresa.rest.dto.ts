import { EmpresaCreateCommandFields } from "@/modules/estagio/empresa/domain/commands/empresa-create.command";
import { EmpresaUpdateCommandFields } from "@/modules/estagio/empresa/domain/commands/empresa-update.command";
import {
  EmpresaCreateSchema,
  EmpresaUpdateSchema,
} from "@/modules/estagio/empresa/domain/empresa.schemas";
import { EmpresaFindOneQueryFields } from "@/modules/estagio/empresa/domain/queries/empresa-find-one.query";
import { EmpresaFindOneQueryResultFields } from "@/modules/estagio/empresa/domain/queries/empresa-find-one.query.result";
import { EmpresaFindOneInputSchema } from "@/modules/estagio/empresa/domain/queries/empresa-find-one.query.schemas";
import { EmpresaListQueryFields } from "@/modules/estagio/empresa/domain/queries/empresa-list.query";
import { EmpresaPaginationInputSchema } from "@/modules/estagio/empresa/domain/queries/empresa-list.query.schemas";
import { EnderecoFindOneOutputRestDto } from "@/modules/localidades/endereco/presentation.rest";
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

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "EmpresaFindOneOutputDto" })
export class EmpresaFindOneOutputRestDto extends EntityBaseRestDto {
  @ApiProperty(EmpresaFindOneQueryResultFields.razaoSocial.swaggerMetadata)
  razaoSocial: string;

  @ApiProperty(EmpresaFindOneQueryResultFields.nomeFantasia.swaggerMetadata)
  nomeFantasia: string;

  @ApiProperty(EmpresaFindOneQueryResultFields.cnpj.swaggerMetadata)
  cnpj: string;

  @ApiProperty(EmpresaFindOneQueryResultFields.telefone.swaggerMetadata)
  telefone: string;

  @ApiProperty(EmpresaFindOneQueryResultFields.email.swaggerMetadata)
  email: string;

  @ApiProperty({
    type: () => EnderecoFindOneOutputRestDto,
    ...EmpresaFindOneQueryResultFields.endereco.swaggerMetadata,
  })
  endereco: EnderecoFindOneOutputRestDto;

  @ApiProperty(EmpresaFindOneQueryResultFields.ativo.swaggerMetadata)
  ativo: boolean;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ApiSchema({ name: "EmpresaListInputDto" })
export class EmpresaListInputRestDto extends PaginatedFilterByIdRestDto {
  static schema = EmpresaPaginationInputSchema;

  @ApiPropertyOptional(EmpresaListQueryFields.filterCnpj.swaggerMetadata)
  @TransformToArray()
  "filter.cnpj"?: string[];

  @ApiPropertyOptional(EmpresaListQueryFields.filterNomeFantasia.swaggerMetadata)
  @TransformToArray()
  "filter.nomeFantasia"?: string[];

  @ApiPropertyOptional(EmpresaListQueryFields.filterEnderecoId.swaggerMetadata)
  @TransformToArray()
  "filter.endereco.id"?: string[];
}

@ApiSchema({ name: "EmpresaListOutputDto" })
export class EmpresaListOutputRestDto {
  @ApiProperty({
    type: () => PaginationMetaRestDto,
    ...EmpresaListQueryFields.meta.swaggerMetadata,
  })
  meta: PaginationMetaRestDto;

  @ApiProperty({
    type: () => [EmpresaFindOneOutputRestDto],
    ...EmpresaListQueryFields.data.swaggerMetadata,
  })
  data: EmpresaFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@ApiSchema({ name: "EmpresaCreateInputDto" })
export class EmpresaCreateInputRestDto {
  static schema = EmpresaCreateSchema.presentation;

  @ApiProperty(EmpresaCreateCommandFields.razaoSocial.swaggerMetadata)
  razaoSocial: string;

  @ApiProperty(EmpresaCreateCommandFields.nomeFantasia.swaggerMetadata)
  nomeFantasia: string;

  @ApiProperty(EmpresaCreateCommandFields.cnpj.swaggerMetadata)
  cnpj: string;

  @ApiProperty(EmpresaCreateCommandFields.telefone.swaggerMetadata)
  telefone: string;

  @ApiProperty(EmpresaCreateCommandFields.email.swaggerMetadata)
  email: string;

  @ApiProperty(EmpresaCreateCommandFields.endereco.swaggerMetadata)
  endereco: { id: string };
}

@ApiSchema({ name: "EmpresaUpdateInputDto" })
export class EmpresaUpdateInputRestDto {
  static schema = EmpresaUpdateSchema.presentation;

  @ApiPropertyOptional(EmpresaUpdateCommandFields.razaoSocial.swaggerMetadata)
  razaoSocial?: string;

  @ApiPropertyOptional(EmpresaUpdateCommandFields.nomeFantasia.swaggerMetadata)
  nomeFantasia?: string;

  @ApiPropertyOptional(EmpresaUpdateCommandFields.cnpj.swaggerMetadata)
  cnpj?: string;

  @ApiPropertyOptional(EmpresaUpdateCommandFields.telefone.swaggerMetadata)
  telefone?: string;

  @ApiPropertyOptional(EmpresaUpdateCommandFields.email.swaggerMetadata)
  email?: string;

  @ApiPropertyOptional(EmpresaUpdateCommandFields.endereco.swaggerMetadata)
  endereco?: { id: string };
}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "EmpresaFindOneInputDto" })
export class EmpresaFindOneInputRestDto {
  static schema = EmpresaFindOneInputSchema;

  @ApiProperty(EmpresaFindOneQueryFields.id.swaggerMetadata)
  id: string;
}
