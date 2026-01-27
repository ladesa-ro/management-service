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
import { PaginationInputDto, PaginationMetaDto, TransformToArray } from "@/shared/dto";
import {
  commonProperties,
  RegisterModel,
  referenceProperty,
  simpleProperty,
} from "@/shared/metadata";
import {
  DiarioProfessorFindOneInputDto,
  DiarioProfessorFindOneOutputDto,
} from "@/v2/server/modules/diario-professor/http/dto";
import {
  HorarioGeradoFindOneInputDto,
  HorarioGeradoFindOneOutputDto,
} from "@/v2/server/modules/horario-gerado/http/dto";
import {
  IntervaloDeTempoFindOneInputDto,
  IntervaloDeTempoFindOneOutputDto,
} from "@/v2/server/modules/intervalo-de-tempo/http/dto";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("HorarioGeradoAula")
@RegisterModel({
  name: "HorarioGeradoAulaFindOneOutput",
  properties: [
    simpleProperty("id"),
    simpleProperty("data"),
    referenceProperty("intervaloDeTempo", "IntervaloDeTempoFindOneOutput"),
    referenceProperty("diarioProfessor", "DiarioProfessorFindOneOutput"),
    referenceProperty("horarioGerado", "HorarioGeradoFindOneOutput"),
    ...commonProperties.dated,
  ],
})
export class HorarioGeradoAulaFindOneOutputDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;

  @ApiProperty({ description: "Data da aula gerada" })
  @Field()
  @IsDateString()
  data: Date;

  @ApiProperty({ type: () => IntervaloDeTempoFindOneOutputDto, description: "Intervalo de tempo" })
  @Field(() => IntervaloDeTempoFindOneOutputDto)
  @ValidateNested()
  @Type(() => IntervaloDeTempoFindOneOutputDto)
  intervaloDeTempo: IntervaloDeTempoFindOneOutputDto;

  @ApiProperty({
    type: () => DiarioProfessorFindOneOutputDto,
    description: "Vinculo de diario e professor",
  })
  @Field(() => DiarioProfessorFindOneOutputDto)
  @ValidateNested()
  @Type(() => DiarioProfessorFindOneOutputDto)
  diarioProfessor: DiarioProfessorFindOneOutputDto;

  @ApiProperty({
    type: () => HorarioGeradoFindOneOutputDto,
    description: "Horario ao qual a aula pertence",
  })
  @Field(() => HorarioGeradoFindOneOutputDto)
  @ValidateNested()
  @Type(() => HorarioGeradoFindOneOutputDto)
  horarioGerado: HorarioGeradoFindOneOutputDto;

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
@InputType("HorarioGeradoAulaListInput")
export class HorarioGeradoAulaListInputDto extends PaginationInputDto {
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

  @ApiPropertyOptional({
    description: "Filtro por ID do Horario Gerado",
    type: [String],
  })
  @TransformToArray()
  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.horarioGerado.id"?: string[];
}

@ObjectType("HorarioGeradoAulaListOutput")
export class HorarioGeradoAulaListOutputDto {
  @ApiProperty({ type: () => PaginationMetaDto, description: "Metadados da busca" })
  @Field(() => PaginationMetaDto)
  meta: PaginationMetaDto;

  @ApiProperty({
    type: () => [HorarioGeradoAulaFindOneOutputDto],
    description: "Resultados da busca",
  })
  @Field(() => [HorarioGeradoAulaFindOneOutputDto])
  data: HorarioGeradoAulaFindOneOutputDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@InputType("HorarioGeradoAulaCreateInput")
export class HorarioGeradoAulaCreateInputDto {
  @ApiProperty({ description: "Data da aula gerada" })
  @Field()
  @IsDateString()
  data: Date;

  @ApiProperty({ type: () => IntervaloDeTempoFindOneInputDto, description: "Intervalo de tempo" })
  @Field(() => IntervaloDeTempoFindOneInputDto)
  @ValidateNested()
  @Type(() => IntervaloDeTempoFindOneInputDto)
  intervaloDeTempo: IntervaloDeTempoFindOneInputDto;

  @ApiProperty({
    type: () => DiarioProfessorFindOneInputDto,
    description: "Vinculo de diario e professor",
  })
  @Field(() => DiarioProfessorFindOneInputDto)
  @ValidateNested()
  @Type(() => DiarioProfessorFindOneInputDto)
  diarioProfessor: DiarioProfessorFindOneInputDto;

  @ApiProperty({
    type: () => HorarioGeradoFindOneInputDto,
    description: "Horario ao qual a aula pertence",
  })
  @Field(() => HorarioGeradoFindOneInputDto)
  @ValidateNested()
  @Type(() => HorarioGeradoFindOneInputDto)
  horarioGerado: HorarioGeradoFindOneInputDto;
}

@InputType("HorarioGeradoAulaUpdateInput")
export class HorarioGeradoAulaUpdateInputDto extends PartialType(HorarioGeradoAulaCreateInputDto) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ArgsType()
@InputType("HorarioGeradoAulaFindOneInput")
export class HorarioGeradoAulaFindOneInputDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;
}
