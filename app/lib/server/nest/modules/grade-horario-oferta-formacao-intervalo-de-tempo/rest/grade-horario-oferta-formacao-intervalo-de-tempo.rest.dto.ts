import { ArgsType, Field, ID, InputType, ObjectType } from "@nestjs/graphql";
import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsArray,
  IsDateString,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from "class-validator";
import {
  commonProperties,
  RegisterModel,
  referenceProperty,
  simpleProperty,
} from "@/modules/@shared/infrastructure/persistence/typeorm/metadata";
import {
  PaginationInputDto,
  PaginationMetaDto,
  TransformToArray,
} from "@/modules/@shared/infrastructure/presentation/rest/dtos";
import {
  GradeHorarioOfertaFormacaoFindOneInputDto,
  GradeHorarioOfertaFormacaoFindOneOutputDto,
} from "@/server/nest/modules/grade-horario-oferta-formacao/rest";
import {
  IntervaloDeTempoFindOneInputDto,
  IntervaloDeTempoFindOneOutputDto,
} from "@/server/nest/modules/intervalo-de-tempo/rest/intervalo-de-tempo.rest.dto";

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
export class GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputRestDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;

  @ApiProperty({
    type: () => GradeHorarioOfertaFormacaoFindOneOutputDto,
    description: "Grade horaria da oferta de formacao",
  })
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
export class GradeHorarioOfertaFormacaoIntervaloDeTempoListInputRestDto extends PaginationInputDto {
  @ApiPropertyOptional({
    description: "Filtro por ID",
    type: [String],
  })
  @TransformToArray()
  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.id"?: string[];
}

@ObjectType("GradeHorarioOfertaFormacaoIntervaloDeTempoListOutput")
export class GradeHorarioOfertaFormacaoIntervaloDeTempoListOutputRestDto {
  @ApiProperty({ type: () => PaginationMetaDto, description: "Metadados da busca" })
  @Field(() => PaginationMetaDto)
  meta: PaginationMetaDto;

  @ApiProperty({
    type: () => [GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputRestDto],
    description: "Resultados da busca",
  })
  @Field(() => [GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputRestDto])
  data: GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@InputType("GradeHorarioOfertaFormacaoIntervaloDeTempoCreateInput")
export class GradeHorarioOfertaFormacaoIntervaloDeTempoCreateInputRestDto {
  @ApiProperty({
    type: () => GradeHorarioOfertaFormacaoFindOneInputDto,
    description: "Grade horaria da oferta de formacao",
  })
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
export class GradeHorarioOfertaFormacaoIntervaloDeTempoUpdateInputRestDto extends PartialType(
  GradeHorarioOfertaFormacaoIntervaloDeTempoCreateInputRestDto,
) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ArgsType()
@InputType("GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInput")
export class GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInputRestDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;
}
