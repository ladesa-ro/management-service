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
  @ApiProperty(CalendarioLetivoDiaFindOneQueryFields.calendarioLetivoId.swaggerMetadata)
  calendarioLetivoId: string;
}

// ============================================================================
// FindByData Params (extends parent)
// ============================================================================

@ApiSchema({ name: "CalendarioLetivoDiaFindByDataParamsDto" })
export class CalendarioLetivoDiaFindByDataParamsRestDto extends CalendarioLetivoDiaParentParamsRestDto {
  @ApiProperty(CalendarioLetivoDiaFindOneQueryFields.data.swaggerMetadata)
  data: string;
}

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "CalendarioLetivoDiaFindOneOutputDto" })
export class CalendarioLetivoDiaFindOneOutputRestDto extends EntityBaseRestDto {
  @ApiProperty(CalendarioLetivoDiaFindOneQueryResultFields.data.swaggerMetadata)
  data: string;

  @ApiProperty(CalendarioLetivoDiaFindOneQueryResultFields.diaLetivo.swaggerMetadata)
  diaLetivo: boolean;

  @ApiProperty(CalendarioLetivoDiaFindOneQueryResultFields.diaPresencial.swaggerMetadata)
  diaPresencial: boolean;

  @ApiProperty({
    ...CalendarioLetivoDiaFindOneQueryResultFields.tipo.swaggerMetadata,
    enum: TIPO_CALENDARIO_LETIVO_DIA_VALUES,
  })
  tipo: TipoCalendarioLetivoDia;

  @ApiPropertyOptional(CalendarioLetivoDiaFindOneQueryResultFields.feriado.swaggerMetadata)
  feriado: string | null;

  @ApiProperty(CalendarioLetivoDiaFindOneQueryResultFields.extraCurricular.swaggerMetadata)
  extraCurricular: boolean;

  @ApiProperty({
    type: () => CalendarioLetivoFindOneOutputRestDto,
    ...CalendarioLetivoDiaFindOneQueryResultFields.calendario.swaggerMetadata,
  })
  calendario: CalendarioLetivoFindOneOutputRestDto;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ApiSchema({ name: "CalendarioLetivoDiaListInputDto" })
export class CalendarioLetivoDiaListInputRestDto extends PaginatedFilterByIdRestDto {
  @ApiPropertyOptional(CalendarioLetivoDiaListQueryFields.filterCalendarioNome.swaggerMetadata)
  @TransformToArray()
  "filter.calendario.nome"?: string[];

  @ApiPropertyOptional(CalendarioLetivoDiaListQueryFields.filterCalendarioAno.swaggerMetadata)
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
  @ApiPropertyOptional(CalendarioLetivoDiaUpdateCommandFields.diaLetivo.swaggerMetadata)
  diaLetivo?: boolean;

  @ApiPropertyOptional(CalendarioLetivoDiaUpdateCommandFields.diaPresencial.swaggerMetadata)
  diaPresencial?: boolean;

  @ApiPropertyOptional({
    ...CalendarioLetivoDiaUpdateCommandFields.tipo.swaggerMetadata,
    enum: TIPO_CALENDARIO_LETIVO_DIA_VALUES,
  })
  tipo?: TipoCalendarioLetivoDia;

  @ApiPropertyOptional(CalendarioLetivoDiaUpdateCommandFields.feriado.swaggerMetadata)
  feriado?: string | null;

  @ApiPropertyOptional(CalendarioLetivoDiaUpdateCommandFields.extraCurricular.swaggerMetadata)
  extraCurricular?: boolean;
}
