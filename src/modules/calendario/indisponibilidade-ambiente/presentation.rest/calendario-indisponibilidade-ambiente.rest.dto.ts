import { z } from "zod";
import {
  AmbienteFindOneInputRestDto,
  AmbienteFindOneOutputRestDto,
} from "@/modules/ambientes/ambiente/presentation.rest";
import { CalendarioIndisponibilidadeAmbienteCreateSchema } from "@/modules/calendario/indisponibilidade-ambiente/domain/calendario-indisponibilidade-ambiente.schemas";
import { CalendarioIndisponibilidadeAmbienteFindOneInputSchema } from "@/modules/calendario/indisponibilidade-ambiente/domain/queries/calendario-indisponibilidade-ambiente-find-one.query.schemas";
import { CalendarioIndisponibilidadeAmbientePaginationInputSchema } from "@/modules/calendario/indisponibilidade-ambiente/domain/queries/calendario-indisponibilidade-ambiente-list.query.schemas";
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
import { CalendarioIndisponibilidadeAmbienteCreateCommandFields } from "../domain/commands/calendario-indisponibilidade-ambiente-create.command";
import { CalendarioIndisponibilidadeAmbienteFindOneQueryResultFields } from "../domain/queries/calendario-indisponibilidade-ambiente-find-one.query.result";
import { CalendarioIndisponibilidadeAmbienteListQueryFields } from "../domain/queries/calendario-indisponibilidade-ambiente-list.query";

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "CalendarioIndisponibilidadeAmbienteFindOneOutputDto" })
export class CalendarioIndisponibilidadeAmbienteFindOneOutputRestDto extends EntityBaseRestDto {
  @ApiProperty({
    ...CalendarioIndisponibilidadeAmbienteFindOneQueryResultFields.ambiente.swaggerMetadata,
    type: () => AmbienteFindOneOutputRestDto,
    description: "Ambiente ao qual a indisponibilidade se aplica",
  })
  ambiente: AmbienteFindOneOutputRestDto;

  @ApiProperty({
    ...CalendarioIndisponibilidadeAmbienteFindOneQueryResultFields.tipo.swaggerMetadata,
    enum: ["BLOQUEIO", "PREFERENCIA"],
  })
  tipo: string;

  @ApiPropertyOptional(
    CalendarioIndisponibilidadeAmbienteFindOneQueryResultFields.diaSemana.swaggerMetadata,
  )
  diaSemana: number | null;

  @ApiPropertyOptional(
    CalendarioIndisponibilidadeAmbienteFindOneQueryResultFields.data.swaggerMetadata,
  )
  data: string | null;

  @ApiProperty(CalendarioIndisponibilidadeAmbienteFindOneQueryResultFields.inicio.swaggerMetadata)
  inicio: string;

  @ApiProperty(CalendarioIndisponibilidadeAmbienteFindOneQueryResultFields.fim.swaggerMetadata)
  fim: string;

  @ApiPropertyOptional(
    CalendarioIndisponibilidadeAmbienteFindOneQueryResultFields.motivo.swaggerMetadata,
  )
  motivo: string | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ApiSchema({ name: "CalendarioIndisponibilidadeAmbienteListInputDto" })
export class CalendarioIndisponibilidadeAmbienteListInputRestDto extends PaginatedFilterByIdRestDto {
  static schema = CalendarioIndisponibilidadeAmbientePaginationInputSchema;

  @ApiPropertyOptional(
    CalendarioIndisponibilidadeAmbienteListQueryFields.filterAmbienteId.swaggerMetadata,
  )
  @TransformToArray()
  "filter.ambiente.id"?: string[];

  @ApiPropertyOptional(
    CalendarioIndisponibilidadeAmbienteListQueryFields.filterTipo.swaggerMetadata,
  )
  @TransformToArray()
  "filter.tipo"?: string[];
}

@ApiSchema({ name: "CalendarioIndisponibilidadeAmbienteListOutputDto" })
export class CalendarioIndisponibilidadeAmbienteListOutputRestDto {
  @ApiProperty({
    ...CalendarioIndisponibilidadeAmbienteListQueryFields.meta.swaggerMetadata,
    type: () => PaginationMetaRestDto,
  })
  meta: PaginationMetaRestDto;

  @ApiProperty({
    ...CalendarioIndisponibilidadeAmbienteListQueryFields.data.swaggerMetadata,
    type: () => [CalendarioIndisponibilidadeAmbienteFindOneOutputRestDto],
  })
  data: CalendarioIndisponibilidadeAmbienteFindOneOutputRestDto[];
}

// ============================================================================
// Create Input
// ============================================================================

@ApiSchema({ name: "CalendarioIndisponibilidadeAmbienteCreateInputDto" })
export class CalendarioIndisponibilidadeAmbienteCreateInputRestDto {
  static schema = CalendarioIndisponibilidadeAmbienteCreateSchema.presentation;

  @ApiProperty({
    ...CalendarioIndisponibilidadeAmbienteCreateCommandFields.ambiente.swaggerMetadata,
    type: () => AmbienteFindOneInputRestDto,
  })
  ambiente: AmbienteFindOneInputRestDto;

  @ApiProperty({
    ...CalendarioIndisponibilidadeAmbienteCreateCommandFields.tipo.swaggerMetadata,
    enum: ["BLOQUEIO", "PREFERENCIA"],
  })
  tipo: string;

  @ApiPropertyOptional(
    CalendarioIndisponibilidadeAmbienteCreateCommandFields.diaSemana.swaggerMetadata,
  )
  diaSemana?: number | null;

  @ApiPropertyOptional(CalendarioIndisponibilidadeAmbienteCreateCommandFields.data.swaggerMetadata)
  data?: string | null;

  @ApiProperty(CalendarioIndisponibilidadeAmbienteCreateCommandFields.inicio.swaggerMetadata)
  inicio: string;

  @ApiProperty(CalendarioIndisponibilidadeAmbienteCreateCommandFields.fim.swaggerMetadata)
  fim: string;

  @ApiPropertyOptional(
    CalendarioIndisponibilidadeAmbienteCreateCommandFields.motivo.swaggerMetadata,
  )
  motivo?: string | null;
}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "CalendarioIndisponibilidadeAmbienteFindOneInputDto" })
export class CalendarioIndisponibilidadeAmbienteFindOneInputRestDto {
  static schema = CalendarioIndisponibilidadeAmbienteFindOneInputSchema;

  @ApiProperty(CalendarioIndisponibilidadeAmbienteFindOneQueryResultFields.id.swaggerMetadata)
  id: string;
}

// ============================================================================
// Por Período — Query Input
// ============================================================================

const CalendarioIndisponibilidadeAmbientePorPeriodoQuerySchema = z.object({
  ambienteId: z.string().uuid(),
  dateStart: z.string().min(1),
  dateEnd: z.string().min(1),
});

@ApiSchema({ name: "CalendarioIndisponibilidadeAmbientePorPeriodoQueryDto" })
export class CalendarioIndisponibilidadeAmbientePorPeriodoQueryRestDto {
  static schema = CalendarioIndisponibilidadeAmbientePorPeriodoQuerySchema;

  @ApiProperty({ description: "ID do ambiente", type: "string", format: "uuid" })
  ambienteId: string;

  @ApiProperty({ description: "Data início do período (YYYY-MM-DD)", type: "string" })
  dateStart: string;

  @ApiProperty({ description: "Data fim do período (YYYY-MM-DD)", type: "string" })
  dateEnd: string;
}

@ApiSchema({ name: "CalendarioIndisponibilidadeAmbientePorPeriodoOutputDto" })
export class CalendarioIndisponibilidadeAmbientePorPeriodoOutputRestDto {
  @ApiProperty({
    description: "Indisponibilidades aplicáveis ao período",
    type: () => [CalendarioIndisponibilidadeAmbienteFindOneOutputRestDto],
  })
  data: CalendarioIndisponibilidadeAmbienteFindOneOutputRestDto[];
}
