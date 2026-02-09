import { ApiProperty, ApiPropertyOptional, ApiSchema, PartialType } from "@nestjs/swagger";
import { IsArray, IsDateString, IsOptional, IsString, IsUUID, Matches } from "class-validator";
import {
  commonProperties,
  RegisterModel,
  simpleProperty,
} from "@/modules/@shared/infrastructure/persistence/typeorm/metadata";
import {
  PaginationInputRestDto,
  PaginationMetaRestDto,
  TransformToArray,
} from "@/modules/@shared/infrastructure/presentation/rest/dtos";

// ============================================================================
// Constants
// ============================================================================

/** Regex pattern for time strings in HH:MM:SS or HH:MM format */
export const TIME_PATTERN = /^([01]\d|2[0-3]):([0-5]\d)(:([0-5]\d))?$/;

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "IntervaloDeTempoFindOneOutputDto" })
@RegisterModel({
  name: "IntervaloDeTempoFindOneOutputDto",
  properties: [
    simpleProperty("id"),
    simpleProperty("periodoInicio"),
    simpleProperty("periodoFim"),
    ...commonProperties.dated,
  ],
})
export class IntervaloDeTempoFindOneOutputRestDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @IsUUID()
  id: string;

  @ApiProperty({
    description: "Horario que o intervalo de tempo inicia",
    format: "time",
    example: "08:00:00",
  })
  @IsString()
  @Matches(TIME_PATTERN, { message: "periodoInicio deve estar no formato HH:MM ou HH:MM:SS" })
  periodoInicio: string;

  @ApiProperty({
    description: "Horario que o intervalo de tempo termina",
    format: "time",
    example: "09:00:00",
  })
  @IsString()
  @Matches(TIME_PATTERN, { message: "periodoFim deve estar no formato HH:MM ou HH:MM:SS" })
  periodoFim: string;

  @ApiProperty({ description: "Data e hora da criacao do registro" })
  @IsDateString()
  dateCreated: Date;

  @ApiProperty({ description: "Data e hora da alteracao do registro" })
  @IsDateString()
  dateUpdated: Date;

  @ApiPropertyOptional({ description: "Data e hora da exclusao do registro", nullable: true })
  @IsOptional()
  @IsDateString()
  dateDeleted: Date | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ApiSchema({ name: "IntervaloDeTempoListInputDto" })
export class IntervaloDeTempoListInputRestDto extends PaginationInputRestDto {
  @ApiPropertyOptional({
    description: "Filtro por ID",
    type: [String],
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  "filter.id"?: string[];
}

@ApiSchema({ name: "IntervaloDeTempoListOutputDto" })
export class IntervaloDeTempoListOutputRestDto {
  @ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" })
  meta: PaginationMetaRestDto;

  @ApiProperty({
    type: () => [IntervaloDeTempoFindOneOutputRestDto],
    description: "Resultados da busca",
  })
  data: IntervaloDeTempoFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@ApiSchema({ name: "IntervaloDeTempoCreateInputDto" })
export class IntervaloDeTempoCreateInputRestDto {
  @ApiProperty({
    description: "Horario que o intervalo de tempo inicia",
    format: "time",
    example: "08:00:00",
  })
  @IsString()
  @Matches(TIME_PATTERN, { message: "periodoInicio deve estar no formato HH:MM ou HH:MM:SS" })
  periodoInicio: string;

  @ApiProperty({
    description: "Horario que o intervalo de tempo termina",
    format: "time",
    example: "09:00:00",
  })
  @IsString()
  @Matches(TIME_PATTERN, { message: "periodoFim deve estar no formato HH:MM ou HH:MM:SS" })
  periodoFim: string;
}

@ApiSchema({ name: "IntervaloDeTempoUpdateInputDto" })
export class IntervaloDeTempoUpdateInputRestDto extends PartialType(
  IntervaloDeTempoCreateInputRestDto,
) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "IntervaloDeTempoFindOneInputDto" })
export class IntervaloDeTempoFindOneInputRestDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @IsUUID()
  id: string;
}
