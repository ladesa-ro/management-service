import { SharedFields } from "@/domain/abstractions";
import {
  AmbienteCreateSchema,
  AmbienteUpdateSchema,
} from "@/modules/ambientes/ambiente/domain/ambiente.schemas";
import { AmbienteFindOneInputSchema } from "@/modules/ambientes/ambiente/domain/queries/ambiente-find-one.query.schemas";
import { AmbientePaginationInputSchema } from "@/modules/ambientes/ambiente/domain/queries/ambiente-list.query.schemas";
import {
  BlocoFindOneOutputRestDto,
  ImagemFindOneOutputRestDto,
} from "@/modules/ambientes/bloco/presentation.rest";
import { ApiProperty, ApiPropertyOptional, ApiSchema } from "@/shared/presentation/rest";
import { EntityBaseRestDto, PaginationMetaRestDto } from "@/shared/presentation/rest/dtos";
import { AmbienteCreateCommandFields } from "../domain/commands/ambiente-create.command";
import { AmbienteUpdateCommandFields } from "../domain/commands/ambiente-update.command";
import { AmbienteFindOneQueryResultFields } from "../domain/queries/ambiente-find-one.query.result";
import { AmbienteListQueryFields } from "../domain/queries/ambiente-list.query";

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "AmbienteFindOneOutputDto" })
export class AmbienteFindOneOutputRestDto extends EntityBaseRestDto {
  @ApiProperty(AmbienteFindOneQueryResultFields.nome.swaggerMetadata)
  nome: string;

  @ApiPropertyOptional(AmbienteFindOneQueryResultFields.descricao.swaggerMetadata)
  descricao: string | null;

  @ApiProperty(AmbienteFindOneQueryResultFields.codigo.swaggerMetadata)
  codigo: string;

  @ApiPropertyOptional(AmbienteFindOneQueryResultFields.capacidade.swaggerMetadata)
  capacidade: number | null;

  @ApiPropertyOptional(AmbienteFindOneQueryResultFields.tipo.swaggerMetadata)
  tipo: string | null;

  @ApiProperty({
    type: () => BlocoFindOneOutputRestDto,
    ...AmbienteFindOneQueryResultFields.bloco.swaggerMetadata,
  })
  bloco: BlocoFindOneOutputRestDto;

  @ApiPropertyOptional({
    type: () => ImagemFindOneOutputRestDto,
    ...AmbienteFindOneQueryResultFields.imagemCapa.swaggerMetadata,
  })
  imagemCapa: ImagemFindOneOutputRestDto | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ApiSchema({ name: "AmbienteListInputDto" })
export class AmbienteListInputRestDto {
  static schema = AmbientePaginationInputSchema;

  [key: string]: string | number | string[] | null | undefined;

  @ApiPropertyOptional(AmbienteListQueryFields.page.swaggerMetadata)
  page?: number;

  @ApiPropertyOptional(AmbienteListQueryFields.limit.swaggerMetadata)
  limit?: number;

  @ApiPropertyOptional(AmbienteListQueryFields.search.swaggerMetadata)
  search?: string;

  @ApiPropertyOptional(AmbienteListQueryFields.sortBy.swaggerMetadata)
  sortBy?: string[];

  @ApiPropertyOptional(AmbienteListQueryFields.selection.swaggerMetadata)
  selection?: string[];

  @ApiPropertyOptional(AmbienteListQueryFields.filterId.swaggerMetadata)
  "filter.id"?: string[];

  @ApiPropertyOptional(AmbienteListQueryFields.filterBlocoId.swaggerMetadata)
  "filter.bloco.id"?: string[];

  @ApiPropertyOptional(AmbienteListQueryFields.filterBlocoCampusId.swaggerMetadata)
  "filter.bloco.campus.id"?: string[];
}

@ApiSchema({ name: "AmbienteListOutputDto" })
export class AmbienteListOutputRestDto {
  @ApiProperty({
    type: () => PaginationMetaRestDto,
    ...AmbienteListQueryFields.meta.swaggerMetadata,
  })
  meta: PaginationMetaRestDto;

  @ApiProperty({
    type: () => [AmbienteFindOneOutputRestDto],
    ...AmbienteListQueryFields.data.swaggerMetadata,
  })
  data: AmbienteFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@ApiSchema({ name: "AmbienteBlocoRefInputDto" })
export class AmbienteBlocoRefInputRestDto {
  @ApiProperty(SharedFields.idUuid.swaggerMetadata)
  id: string;
}

@ApiSchema({ name: "AmbienteCreateInputDto" })
export class AmbienteCreateInputRestDto {
  static schema = AmbienteCreateSchema.presentation;

  @ApiProperty(AmbienteCreateCommandFields.nome.swaggerMetadata)
  nome: string;

  @ApiPropertyOptional(AmbienteCreateCommandFields.descricao.swaggerMetadata)
  descricao?: string | null;

  @ApiProperty(AmbienteCreateCommandFields.codigo.swaggerMetadata)
  codigo: string;

  @ApiPropertyOptional(AmbienteCreateCommandFields.capacidade.swaggerMetadata)
  capacidade?: number | null;

  @ApiPropertyOptional(AmbienteCreateCommandFields.tipo.swaggerMetadata)
  tipo?: string | null;

  @ApiProperty({
    type: () => AmbienteBlocoRefInputRestDto,
    ...AmbienteCreateCommandFields.bloco.swaggerMetadata,
  })
  bloco: AmbienteBlocoRefInputRestDto;
}

@ApiSchema({ name: "AmbienteUpdateInputDto" })
export class AmbienteUpdateInputRestDto {
  static schema = AmbienteUpdateSchema.presentation;

  @ApiPropertyOptional(AmbienteUpdateCommandFields.nome.swaggerMetadata)
  nome?: string;

  @ApiPropertyOptional(AmbienteUpdateCommandFields.descricao.swaggerMetadata)
  descricao?: string | null;

  @ApiPropertyOptional(AmbienteUpdateCommandFields.codigo.swaggerMetadata)
  codigo?: string;

  @ApiPropertyOptional(AmbienteUpdateCommandFields.capacidade.swaggerMetadata)
  capacidade?: number | null;

  @ApiPropertyOptional(AmbienteUpdateCommandFields.tipo.swaggerMetadata)
  tipo?: string | null;

  @ApiPropertyOptional({
    type: () => AmbienteBlocoRefInputRestDto,
    ...AmbienteUpdateCommandFields.bloco.swaggerMetadata,
  })
  bloco?: AmbienteBlocoRefInputRestDto;
}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "AmbienteFindOneInputDto" })
export class AmbienteFindOneInputRestDto {
  static schema = AmbienteFindOneInputSchema;

  @ApiProperty(SharedFields.idUuid.swaggerMetadata)
  id: string;
}
