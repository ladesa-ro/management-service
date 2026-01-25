import { ArgsType, Field, ID, InputType, ObjectType } from "@nestjs/graphql";
import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { IsArray, IsDateString, IsOptional, IsString, IsUUID, Matches } from "class-validator";
import { PaginationInputDto, PaginationMetaDto } from "@/shared/dto";
import { commonProperties, RegisterModel, simpleProperty } from "@/shared/metadata";

// ============================================================================
// Constants
// ============================================================================

/** Regex pattern for time strings in HH:MM:SS or HH:MM format */
export const TIME_PATTERN = /^([01]\d|2[0-3]):([0-5]\d)(:([0-5]\d))?$/;

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("IntervaloDeTempo")
@RegisterModel({
  name: "IntervaloDeTempoFindOneOutput",
  properties: [
    simpleProperty("id"),
    simpleProperty("periodoInicio"),
    simpleProperty("periodoFim"),
    ...commonProperties.dated,
  ],
})
export class IntervaloDeTempoFindOneOutputDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;

  @ApiProperty({
    description: "Horario que o intervalo de tempo inicia",
    format: "time",
    example: "08:00:00",
  })
  @Field()
  @IsString()
  @Matches(TIME_PATTERN, { message: "periodoInicio deve estar no formato HH:MM ou HH:MM:SS" })
  periodoInicio: string;

  @ApiProperty({
    description: "Horario que o intervalo de tempo termina",
    format: "time",
    example: "09:00:00",
  })
  @Field()
  @IsString()
  @Matches(TIME_PATTERN, { message: "periodoFim deve estar no formato HH:MM ou HH:MM:SS" })
  periodoFim: string;

  @ApiProperty({ description: "Data e hora da criacao do registro" })
  @Field()
  @IsDateString()
  dateCreated: Date;

  @ApiProperty({ description: "Data e hora da alteracao do registro" })
  @Field()
  @IsDateString()
  dateUpdated: Date;

  @ApiPropertyOptional({ description: "Data e hora da exclusao do registro", nullable: true })
  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  dateDeleted: Date | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ArgsType()
@InputType("IntervaloDeTempoListInput")
export class IntervaloDeTempoListInputDto extends PaginationInputDto {
  @ApiPropertyOptional({
    description: "Filtro por ID",
    type: [String],
  })
  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.id"?: string[];
}

@ObjectType("IntervaloDeTempoListOutput")
export class IntervaloDeTempoListOutputDto {
  @ApiProperty({ type: () => PaginationMetaDto, description: "Metadados da busca" })
  @Field(() => PaginationMetaDto)
  meta: PaginationMetaDto;

  @ApiProperty({
    type: () => [IntervaloDeTempoFindOneOutputDto],
    description: "Resultados da busca",
  })
  @Field(() => [IntervaloDeTempoFindOneOutputDto])
  data: IntervaloDeTempoFindOneOutputDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@InputType("IntervaloDeTempoCreateInput")
export class IntervaloDeTempoCreateInputDto {
  @ApiProperty({
    description: "Horario que o intervalo de tempo inicia",
    format: "time",
    example: "08:00:00",
  })
  @Field()
  @IsString()
  @Matches(TIME_PATTERN, { message: "periodoInicio deve estar no formato HH:MM ou HH:MM:SS" })
  periodoInicio: string;

  @ApiProperty({
    description: "Horario que o intervalo de tempo termina",
    format: "time",
    example: "09:00:00",
  })
  @Field()
  @IsString()
  @Matches(TIME_PATTERN, { message: "periodoFim deve estar no formato HH:MM ou HH:MM:SS" })
  periodoFim: string;
}

@InputType("IntervaloDeTempoUpdateInput")
export class IntervaloDeTempoUpdateInputDto extends PartialType(IntervaloDeTempoCreateInputDto) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ArgsType()
@InputType("IntervaloDeTempoFindOneInput")
export class IntervaloDeTempoFindOneInputDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;
}
