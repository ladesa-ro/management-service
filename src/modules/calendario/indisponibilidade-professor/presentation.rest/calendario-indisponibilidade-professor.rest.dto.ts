import { z } from "zod";
import {
  PerfilFindOneInputRestDto,
  PerfilFindOneOutputRestDto,
} from "@/modules/acesso/usuario/perfil/presentation.rest";
import { CalendarioIndisponibilidadeProfessorCreateSchema } from "@/modules/calendario/indisponibilidade-professor/domain/calendario-indisponibilidade-professor.schemas";
import { CalendarioIndisponibilidadeProfessorFindOneInputSchema } from "@/modules/calendario/indisponibilidade-professor/domain/queries/calendario-indisponibilidade-professor-find-one.query.schemas";
import { CalendarioIndisponibilidadeProfessorPaginationInputSchema } from "@/modules/calendario/indisponibilidade-professor/domain/queries/calendario-indisponibilidade-professor-list.query.schemas";
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
import { CalendarioIndisponibilidadeProfessorCreateCommandFields } from "../domain/commands/calendario-indisponibilidade-professor-create.command";
import { CalendarioIndisponibilidadeProfessorFindOneQueryResultFields } from "../domain/queries/calendario-indisponibilidade-professor-find-one.query.result";
import { CalendarioIndisponibilidadeProfessorListQueryFields } from "../domain/queries/calendario-indisponibilidade-professor-list.query";

@ApiSchema({ name: "CalendarioIndisponibilidadeProfessorFindOneOutputDto" })
export class CalendarioIndisponibilidadeProfessorFindOneOutputRestDto extends EntityBaseRestDto {
  @ApiProperty({
    ...CalendarioIndisponibilidadeProfessorFindOneQueryResultFields.perfil.swaggerMetadata,
    type: () => PerfilFindOneOutputRestDto,
    description: "Professor (perfil) ao qual a indisponibilidade se aplica",
  })
  perfil: PerfilFindOneOutputRestDto;

  @ApiProperty({
    ...CalendarioIndisponibilidadeProfessorFindOneQueryResultFields.tipo.swaggerMetadata,
    enum: ["BLOQUEIO", "PREFERENCIA"],
  })
  tipo: string;

  @ApiPropertyOptional(
    CalendarioIndisponibilidadeProfessorFindOneQueryResultFields.diaSemana.swaggerMetadata,
  )
  diaSemana: number | null;

  @ApiPropertyOptional(
    CalendarioIndisponibilidadeProfessorFindOneQueryResultFields.data.swaggerMetadata,
  )
  data: string | null;

  @ApiProperty(CalendarioIndisponibilidadeProfessorFindOneQueryResultFields.inicio.swaggerMetadata)
  inicio: string;

  @ApiProperty(CalendarioIndisponibilidadeProfessorFindOneQueryResultFields.fim.swaggerMetadata)
  fim: string;

  @ApiPropertyOptional(
    CalendarioIndisponibilidadeProfessorFindOneQueryResultFields.motivo.swaggerMetadata,
  )
  motivo: string | null;
}

@ApiSchema({ name: "CalendarioIndisponibilidadeProfessorListInputDto" })
export class CalendarioIndisponibilidadeProfessorListInputRestDto extends PaginatedFilterByIdRestDto {
  static schema = CalendarioIndisponibilidadeProfessorPaginationInputSchema;

  @ApiPropertyOptional(
    CalendarioIndisponibilidadeProfessorListQueryFields.filterPerfilId.swaggerMetadata,
  )
  @TransformToArray()
  "filter.perfil.id"?: string[];

  @ApiPropertyOptional(
    CalendarioIndisponibilidadeProfessorListQueryFields.filterTipo.swaggerMetadata,
  )
  @TransformToArray()
  "filter.tipo"?: string[];
}

@ApiSchema({ name: "CalendarioIndisponibilidadeProfessorListOutputDto" })
export class CalendarioIndisponibilidadeProfessorListOutputRestDto {
  @ApiProperty({
    ...CalendarioIndisponibilidadeProfessorListQueryFields.meta.swaggerMetadata,
    type: () => PaginationMetaRestDto,
  })
  meta: PaginationMetaRestDto;

  @ApiProperty({
    ...CalendarioIndisponibilidadeProfessorListQueryFields.data.swaggerMetadata,
    type: () => [CalendarioIndisponibilidadeProfessorFindOneOutputRestDto],
  })
  data: CalendarioIndisponibilidadeProfessorFindOneOutputRestDto[];
}

@ApiSchema({ name: "CalendarioIndisponibilidadeProfessorCreateInputDto" })
export class CalendarioIndisponibilidadeProfessorCreateInputRestDto {
  static schema = CalendarioIndisponibilidadeProfessorCreateSchema.presentation;

  @ApiProperty({
    ...CalendarioIndisponibilidadeProfessorCreateCommandFields.perfil.swaggerMetadata,
    type: () => PerfilFindOneInputRestDto,
  })
  perfil: PerfilFindOneInputRestDto;

  @ApiProperty({
    ...CalendarioIndisponibilidadeProfessorCreateCommandFields.tipo.swaggerMetadata,
    enum: ["BLOQUEIO", "PREFERENCIA"],
  })
  tipo: string;

  @ApiPropertyOptional(
    CalendarioIndisponibilidadeProfessorCreateCommandFields.diaSemana.swaggerMetadata,
  )
  diaSemana?: number | null;

  @ApiPropertyOptional(CalendarioIndisponibilidadeProfessorCreateCommandFields.data.swaggerMetadata)
  data?: string | null;

  @ApiProperty(CalendarioIndisponibilidadeProfessorCreateCommandFields.inicio.swaggerMetadata)
  inicio: string;

  @ApiProperty(CalendarioIndisponibilidadeProfessorCreateCommandFields.fim.swaggerMetadata)
  fim: string;

  @ApiPropertyOptional(
    CalendarioIndisponibilidadeProfessorCreateCommandFields.motivo.swaggerMetadata,
  )
  motivo?: string | null;
}

@ApiSchema({ name: "CalendarioIndisponibilidadeProfessorFindOneInputDto" })
export class CalendarioIndisponibilidadeProfessorFindOneInputRestDto {
  static schema = CalendarioIndisponibilidadeProfessorFindOneInputSchema;

  @ApiProperty(CalendarioIndisponibilidadeProfessorFindOneQueryResultFields.id.swaggerMetadata)
  id: string;
}

const CalendarioIndisponibilidadeProfessorPorPeriodoQuerySchema = z.object({
  perfilId: z.string().uuid(),
  dateStart: z.string().min(1),
  dateEnd: z.string().min(1),
});

@ApiSchema({ name: "CalendarioIndisponibilidadeProfessorPorPeriodoQueryDto" })
export class CalendarioIndisponibilidadeProfessorPorPeriodoQueryRestDto {
  static schema = CalendarioIndisponibilidadeProfessorPorPeriodoQuerySchema;

  @ApiProperty({ description: "ID do perfil (professor)", type: "string", format: "uuid" })
  perfilId: string;

  @ApiProperty({ description: "Data início do período (YYYY-MM-DD)", type: "string" })
  dateStart: string;

  @ApiProperty({ description: "Data fim do período (YYYY-MM-DD)", type: "string" })
  dateEnd: string;
}

@ApiSchema({ name: "CalendarioIndisponibilidadeProfessorPorPeriodoOutputDto" })
export class CalendarioIndisponibilidadeProfessorPorPeriodoOutputRestDto {
  @ApiProperty({
    description: "Indisponibilidades aplicáveis ao período",
    type: () => [CalendarioIndisponibilidadeProfessorFindOneOutputRestDto],
  })
  data: CalendarioIndisponibilidadeProfessorFindOneOutputRestDto[];
}
