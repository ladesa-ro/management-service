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
import {
  TIPO_CALENDARIO_LETIVO_DIA_VALUES,
  type TipoCalendarioLetivoDia,
} from "../domain/calendario-letivo-dia";
import { CalendarioLetivoDiaUpdateCommandFields } from "../domain/commands/calendario-letivo-dia-update.command";
import { CalendarioLetivoDiaFindOneQueryFields } from "../domain/queries/calendario-letivo-dia-find-one.query";
import { CalendarioLetivoDiaFindOneQueryResultFields } from "../domain/queries/calendario-letivo-dia-find-one.query.result";
import { CalendarioLetivoDiaListQueryFields } from "../domain/queries/calendario-letivo-dia-list.query";
import { CalendarioLetivoFindOneOutputRestDto } from "./calendario-letivo.rest.dto";

export { TIPO_CALENDARIO_LETIVO_DIA_VALUES, type TipoCalendarioLetivoDia };

// ============================================================================
// Parent Route Params
// ============================================================================

@ApiSchema({ name: "CalendarioLetivoDiaParentParamsDto" })
export class CalendarioLetivoDiaParentParamsRestDto {
  @ApiProperty({
    type: "string",
    ...CalendarioLetivoDiaFindOneQueryFields.calendarioLetivoId.swaggerMetadata,
    format: "uuid",
  })
  calendarioLetivoId: string;
}

// ============================================================================
// FindByData Params (extends parent)
// ============================================================================

@ApiSchema({ name: "CalendarioLetivoDiaFindByDataParamsDto" })
export class CalendarioLetivoDiaFindByDataParamsRestDto extends CalendarioLetivoDiaParentParamsRestDto {
  @ApiProperty({
    type: "string",
    ...CalendarioLetivoDiaFindOneQueryFields.data.swaggerMetadata,
    format: "date",
  })
  data: string;
}

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "CalendarioLetivoDiaFindOneOutputDto" })
export class CalendarioLetivoDiaFindOneOutputRestDto extends EntityBaseRestDto {
  @ApiProperty({
    type: "string",
    ...CalendarioLetivoDiaFindOneQueryResultFields.data.swaggerMetadata,
    format: "date",
  })
  data: string;

  @ApiProperty({
    type: "boolean",
    ...CalendarioLetivoDiaFindOneQueryResultFields.diaLetivo.swaggerMetadata,
  })
  diaLetivo: boolean;

  @ApiProperty({
    type: "boolean",
    ...CalendarioLetivoDiaFindOneQueryResultFields.diaPresencial.swaggerMetadata,
  })
  diaPresencial: boolean;

  @ApiProperty({
    type: "string",
    ...CalendarioLetivoDiaFindOneQueryResultFields.tipo.swaggerMetadata,
    enum: TIPO_CALENDARIO_LETIVO_DIA_VALUES,
  })
  tipo: TipoCalendarioLetivoDia;

  @ApiPropertyOptional({
    type: "string",
    ...CalendarioLetivoDiaFindOneQueryResultFields.feriado.swaggerMetadata,
    nullable: true,
  })
  feriado: string | null;

  @ApiProperty({
    type: "boolean",
    ...CalendarioLetivoDiaFindOneQueryResultFields.extraCurricular.swaggerMetadata,
  })
  extraCurricular: boolean;

  @ApiProperty({
    type: () => CalendarioLetivoFindOneOutputRestDto,
    ...CalendarioLetivoDiaFindOneQueryResultFields.calendario.swaggerMetadata,
    nullable: true,
  })
  calendario: CalendarioLetivoFindOneOutputRestDto | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ApiSchema({ name: "CalendarioLetivoDiaListInputDto" })
export class CalendarioLetivoDiaListInputRestDto extends PaginatedFilterByIdRestDto {
  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    ...CalendarioLetivoDiaListQueryFields.filterCalendarioNome.swaggerMetadata,
  })
  @TransformToArray()
  "filter.calendario.nome"?: string[];

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    ...CalendarioLetivoDiaListQueryFields.filterCalendarioAno.swaggerMetadata,
  })
  @TransformToArray()
  "filter.calendario.ano"?: string[];
}

@ApiSchema({ name: "CalendarioLetivoDiaListOutputDto" })
export class CalendarioLetivoDiaListOutputRestDto {
  @ApiProperty({
    type: () => PaginationMetaRestDto,
    ...CalendarioLetivoDiaListQueryFields.meta.swaggerMetadata,
  })
  meta: PaginationMetaRestDto;

  @ApiProperty({
    type: () => [CalendarioLetivoDiaFindOneOutputRestDto],
    ...CalendarioLetivoDiaListQueryFields.data.swaggerMetadata,
  })
  data: CalendarioLetivoDiaFindOneOutputRestDto[];
}

// ============================================================================
// Update Input
// ============================================================================

@ApiSchema({ name: "CalendarioLetivoDiaUpdateInputDto" })
export class CalendarioLetivoDiaUpdateInputRestDto {
  @ApiPropertyOptional({
    type: "boolean",
    ...CalendarioLetivoDiaUpdateCommandFields.diaLetivo.swaggerMetadata,
  })
  diaLetivo?: boolean;

  @ApiPropertyOptional({
    type: "boolean",
    ...CalendarioLetivoDiaUpdateCommandFields.diaPresencial.swaggerMetadata,
  })
  diaPresencial?: boolean;

  @ApiPropertyOptional({
    type: "string",
    ...CalendarioLetivoDiaUpdateCommandFields.tipo.swaggerMetadata,
    enum: TIPO_CALENDARIO_LETIVO_DIA_VALUES,
  })
  tipo?: TipoCalendarioLetivoDia;

  @ApiPropertyOptional({
    type: "string",
    ...CalendarioLetivoDiaUpdateCommandFields.feriado.swaggerMetadata,
    nullable: true,
  })
  feriado?: string | null;

  @ApiPropertyOptional({
    type: "boolean",
    ...CalendarioLetivoDiaUpdateCommandFields.extraCurricular.swaggerMetadata,
  })
  extraCurricular?: boolean;
}
