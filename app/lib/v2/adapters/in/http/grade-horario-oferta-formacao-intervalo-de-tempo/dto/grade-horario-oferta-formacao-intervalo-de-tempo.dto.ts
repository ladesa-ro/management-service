import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { ArgsType, Field, ID, InputType, ObjectType } from "@nestjs/graphql";
import { IsArray, IsDateString, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { PaginationInputDto, PaginationMetaDto } from "@/shared/dto";
import { commonProperties, referenceProperty, RegisterModel, simpleProperty, } from "@/shared/metadata";
import {
  GradeHorarioOfertaFormacaoFindOneInputDto,
  GradeHorarioOfertaFormacaoFindOneOutputDto
} from "@/v2/adapters/in/http/grade-horario-oferta-formacao/dto";
import {
  IntervaloDeTempoFindOneInputDto,
  IntervaloDeTempoFindOneOutputDto
} from "@/v2/adapters/in/http/intervalo-de-tempo/dto";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("GradeHorarioOfertaFormacaoIntervaloDeTempo")
@RegisterModel({
  name: "GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutput",
  properties: [
    simpleProperty("id"),
    referenceProperty("gradeHorarioOfertaFormacao", "GradeHorarioOfertaFormacaoFindOneOutput"),
    referenceProperty("intervaloDeTempo", "IntervaloDeTempoFindOneOutput"),
    ...commonProperties.dated,
  ],
})
export class GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;

  @ApiProperty({ type: () => GradeHorarioOfertaFormacaoFindOneOutputDto, description: "Grade horaria da oferta de formacao" })
  @Field(() => GradeHorarioOfertaFormacaoFindOneOutputDto)
  @ValidateNested()
  @Type(() => GradeHorarioOfertaFormacaoFindOneOutputDto)
  gradeHorarioOfertaFormacao: GradeHorarioOfertaFormacaoFindOneOutputDto;

  @ApiProperty({ type: () => IntervaloDeTempoFindOneOutputDto, description: "Intervalo de tempo" })
  @Field(() => IntervaloDeTempoFindOneOutputDto)
  @ValidateNested()
  @Type(() => IntervaloDeTempoFindOneOutputDto)
  intervaloDeTempo: IntervaloDeTempoFindOneOutputDto;

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
@InputType("GradeHorarioOfertaFormacaoIntervaloDeTempoListInput")
export class GradeHorarioOfertaFormacaoIntervaloDeTempoListInputDto extends PaginationInputDto {
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

@ObjectType("GradeHorarioOfertaFormacaoIntervaloDeTempoListOutput")
export class GradeHorarioOfertaFormacaoIntervaloDeTempoListOutputDto {
  @ApiProperty({ type: () => PaginationMetaDto, description: "Metadados da busca" })
  @Field(() => PaginationMetaDto)
  meta: PaginationMetaDto;

  @ApiProperty({ type: () => [GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputDto], description: "Resultados da busca" })
  @Field(() => [GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputDto])
  data: GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@InputType("GradeHorarioOfertaFormacaoIntervaloDeTempoCreateInput")
export class GradeHorarioOfertaFormacaoIntervaloDeTempoCreateInputDto {
  @ApiProperty({ type: () => GradeHorarioOfertaFormacaoFindOneInputDto, description: "Grade horaria da oferta de formacao" })
  @Field(() => GradeHorarioOfertaFormacaoFindOneInputDto)
  @ValidateNested()
  @Type(() => GradeHorarioOfertaFormacaoFindOneInputDto)
  gradeHorarioOfertaFormacao: GradeHorarioOfertaFormacaoFindOneInputDto;

  @ApiProperty({ type: () => IntervaloDeTempoFindOneInputDto, description: "Intervalo de tempo" })
  @Field(() => IntervaloDeTempoFindOneInputDto)
  @ValidateNested()
  @Type(() => IntervaloDeTempoFindOneInputDto)
  intervaloDeTempo: IntervaloDeTempoFindOneInputDto;
}

@InputType("GradeHorarioOfertaFormacaoIntervaloDeTempoUpdateInput")
export class GradeHorarioOfertaFormacaoIntervaloDeTempoUpdateInputDto extends PartialType(GradeHorarioOfertaFormacaoIntervaloDeTempoCreateInputDto) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ArgsType()
@InputType("GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInput")
export class GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInputDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;
}
