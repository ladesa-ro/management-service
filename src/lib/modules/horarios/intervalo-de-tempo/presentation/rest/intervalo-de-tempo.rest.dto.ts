import { ApiProperty, ApiSchema, PartialType } from "@nestjs/swagger";
import { IsString, IsUUID, Matches } from "class-validator";
import { decorate } from "ts-mixer";
import {
  commonProperties,
  RegisterModel,
  simpleProperty,
} from "@/modules/@shared/infrastructure/persistence/typeorm/metadata";
import {
  EntityBaseRestDto,
  PaginatedFilterByIdRestDto,
  PaginationMetaRestDto,
} from "@/modules/@shared/infrastructure/presentation/rest/dtos";

// ============================================================================
// Constants
// ============================================================================

/** Regex pattern for time strings in HH:MM:SS or HH:MM format */
export const TIME_PATTERN = /^([01]\d|2[0-3]):([0-5]\d)(:([0-5]\d))?$/;

// ============================================================================
// FindOne Output
// ============================================================================

@decorate(ApiSchema({ name: "IntervaloDeTempoFindOneOutputDto" }))
@decorate(
  RegisterModel({
    name: "IntervaloDeTempoFindOneOutputDto",
    properties: [
      simpleProperty("id"),
      simpleProperty("periodoInicio"),
      simpleProperty("periodoFim"),
      ...commonProperties.dated,
    ],
  }),
)
export class IntervaloDeTempoFindOneOutputRestDto extends EntityBaseRestDto {
  @decorate(
    ApiProperty({
      type: "string",
      description: "Horario que o intervalo de tempo inicia",
      format: "time",
      example: "08:00:00",
    }),
  )
  @decorate(IsString())
  @decorate(
    Matches(TIME_PATTERN, { message: "periodoInicio deve estar no formato HH:MM ou HH:MM:SS" }),
  )
  periodoInicio: string;

  @decorate(
    ApiProperty({
      type: "string",
      description: "Horario que o intervalo de tempo termina",
      format: "time",
      example: "09:00:00",
    }),
  )
  @decorate(IsString())
  @decorate(
    Matches(TIME_PATTERN, { message: "periodoFim deve estar no formato HH:MM ou HH:MM:SS" }),
  )
  periodoFim: string;
}

// ============================================================================
// List Input/Output
// ============================================================================

@decorate(ApiSchema({ name: "IntervaloDeTempoListInputDto" }))
export class IntervaloDeTempoListInputRestDto extends PaginatedFilterByIdRestDto {}

@decorate(ApiSchema({ name: "IntervaloDeTempoListOutputDto" }))
export class IntervaloDeTempoListOutputRestDto {
  @decorate(ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" }))
  meta: PaginationMetaRestDto;

  @decorate(
    ApiProperty({
      type: () => [IntervaloDeTempoFindOneOutputRestDto],
      description: "Resultados da busca",
    }),
  )
  data: IntervaloDeTempoFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@decorate(ApiSchema({ name: "IntervaloDeTempoCreateInputDto" }))
export class IntervaloDeTempoCreateInputRestDto {
  @decorate(
    ApiProperty({
      type: "string",
      description: "Horario que o intervalo de tempo inicia",
      format: "time",
      example: "08:00:00",
    }),
  )
  @decorate(IsString())
  @decorate(
    Matches(TIME_PATTERN, { message: "periodoInicio deve estar no formato HH:MM ou HH:MM:SS" }),
  )
  periodoInicio: string;

  @decorate(
    ApiProperty({
      type: "string",
      description: "Horario que o intervalo de tempo termina",
      format: "time",
      example: "09:00:00",
    }),
  )
  @decorate(IsString())
  @decorate(
    Matches(TIME_PATTERN, { message: "periodoFim deve estar no formato HH:MM ou HH:MM:SS" }),
  )
  periodoFim: string;
}

@decorate(ApiSchema({ name: "IntervaloDeTempoUpdateInputDto" }))
export class IntervaloDeTempoUpdateInputRestDto extends PartialType(
  IntervaloDeTempoCreateInputRestDto,
) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@decorate(ApiSchema({ name: "IntervaloDeTempoFindOneInputDto" }))
export class IntervaloDeTempoFindOneInputRestDto {
  @decorate(
    ApiProperty({
      type: "string",
      description: "Identificador do registro (uuid)",
      format: "uuid",
    }),
  )
  @decorate(IsUUID())
  id: string;
}
