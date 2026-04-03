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
import { DiarioPreferenciaAgrupamentoBulkReplaceCommandFields } from "../domain/commands/diario-preferencia-agrupamento-bulk-replace.command";
import { DiarioPreferenciaAgrupamentoFindOneQueryResultFields } from "../domain/queries/diario-preferencia-agrupamento-find-one.query.result";
import { DiarioPreferenciaAgrupamentoListQueryFields } from "../domain/queries/diario-preferencia-agrupamento-list.query";
import { DiarioFindOneOutputRestDto } from "./diario.rest.dto";

// ============================================================================
// Parent Route Params
// ============================================================================

@ApiSchema({ name: "DiarioPreferenciaAgrupamentoParentParamsDto" })
export class DiarioPreferenciaAgrupamentoParentParamsRestDto {
  @ApiProperty({
    type: "string",
    ...DiarioPreferenciaAgrupamentoBulkReplaceCommandFields.diarioId.swaggerMetadata,
    format: "uuid",
  })
  diarioId: string;
}

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "DiarioPreferenciaAgrupamentoFindOneOutputDto" })
export class DiarioPreferenciaAgrupamentoFindOneOutputRestDto extends EntityBaseRestDto {
  @ApiProperty({
    type: "string",
    ...DiarioPreferenciaAgrupamentoFindOneQueryResultFields.modo.swaggerMetadata,
    enum: ["DEFINIDO", "POR_DIA_SEMANA"],
  })
  modo: string;

  @ApiProperty({
    type: "integer",
    ...DiarioPreferenciaAgrupamentoFindOneQueryResultFields.ordem.swaggerMetadata,
    minimum: 1,
  })
  ordem: number;

  @ApiProperty({
    type: "string",
    ...DiarioPreferenciaAgrupamentoFindOneQueryResultFields.dataInicio.swaggerMetadata,
  })
  dataInicio: string;

  @ApiPropertyOptional({
    type: "string",
    ...DiarioPreferenciaAgrupamentoFindOneQueryResultFields.dataFim.swaggerMetadata,
    nullable: true,
  })
  dataFim: string | null;

  @ApiPropertyOptional({
    type: "integer",
    ...DiarioPreferenciaAgrupamentoFindOneQueryResultFields.diaSemanaIso.swaggerMetadata,
    minimum: 1,
    maximum: 7,
    nullable: true,
  })
  diaSemanaIso: number | null;

  @ApiProperty({
    type: "integer",
    ...DiarioPreferenciaAgrupamentoFindOneQueryResultFields.aulasSeguidas.swaggerMetadata,
    minimum: 1,
  })
  aulasSeguidas: number;

  @ApiProperty({
    ...DiarioPreferenciaAgrupamentoFindOneQueryResultFields.diario.swaggerMetadata,
    type: () => DiarioFindOneOutputRestDto,
  })
  diario: DiarioFindOneOutputRestDto;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ApiSchema({ name: "DiarioPreferenciaAgrupamentoListInputDto" })
export class DiarioPreferenciaAgrupamentoListInputRestDto extends PaginatedFilterByIdRestDto {
  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    ...DiarioPreferenciaAgrupamentoListQueryFields.filterDiarioId.swaggerMetadata,
  })
  @TransformToArray()
  "filter.diario.id"?: string[];
}

@ApiSchema({ name: "DiarioPreferenciaAgrupamentoListOutputDto" })
export class DiarioPreferenciaAgrupamentoListOutputRestDto {
  @ApiProperty({
    ...DiarioPreferenciaAgrupamentoListQueryFields.meta.swaggerMetadata,
    type: () => PaginationMetaRestDto,
  })
  meta: PaginationMetaRestDto;

  @ApiProperty({
    ...DiarioPreferenciaAgrupamentoListQueryFields.data.swaggerMetadata,
    type: () => [DiarioPreferenciaAgrupamentoFindOneOutputRestDto],
  })
  data: DiarioPreferenciaAgrupamentoFindOneOutputRestDto[];
}

// ============================================================================
// Bulk Replace Input
// ============================================================================

@ApiSchema({ name: "DiarioPreferenciaAgrupamentoBulkReplaceItemDto" })
export class DiarioPreferenciaAgrupamentoBulkReplaceItemRestDto {
  @ApiProperty({
    type: "string",
    ...DiarioPreferenciaAgrupamentoBulkReplaceCommandFields.modo.swaggerMetadata,
    enum: ["DEFINIDO", "POR_DIA_SEMANA"],
  })
  modo: string;

  @ApiProperty({
    type: "integer",
    ...DiarioPreferenciaAgrupamentoBulkReplaceCommandFields.ordem.swaggerMetadata,
    minimum: 1,
  })
  ordem: number;

  @ApiProperty({
    type: "string",
    ...DiarioPreferenciaAgrupamentoBulkReplaceCommandFields.dataInicio.swaggerMetadata,
  })
  dataInicio: string;

  @ApiPropertyOptional({
    type: "string",
    ...DiarioPreferenciaAgrupamentoBulkReplaceCommandFields.dataFim.swaggerMetadata,
    nullable: true,
  })
  dataFim?: string | null;

  @ApiPropertyOptional({
    type: "integer",
    ...DiarioPreferenciaAgrupamentoBulkReplaceCommandFields.diaSemanaIso.swaggerMetadata,
    minimum: 1,
    maximum: 7,
    nullable: true,
  })
  diaSemanaIso?: number | null;

  @ApiProperty({
    type: "integer",
    ...DiarioPreferenciaAgrupamentoBulkReplaceCommandFields.aulasSeguidas.swaggerMetadata,
    minimum: 1,
  })
  aulasSeguidas: number;
}

@ApiSchema({ name: "DiarioPreferenciaAgrupamentoBulkReplaceInputDto" })
export class DiarioPreferenciaAgrupamentoBulkReplaceInputRestDto {
  @ApiProperty({
    ...DiarioPreferenciaAgrupamentoBulkReplaceCommandFields.preferenciasAgrupamento.swaggerMetadata,
    type: () => [DiarioPreferenciaAgrupamentoBulkReplaceItemRestDto],
  })
  preferenciasAgrupamento: DiarioPreferenciaAgrupamentoBulkReplaceItemRestDto[];
}
