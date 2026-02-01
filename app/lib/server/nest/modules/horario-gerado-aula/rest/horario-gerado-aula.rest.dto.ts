import { ArgsType, Field, ID, InputType, ObjectType, PartialType } from "@nestjs/graphql";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
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
  DiarioProfessorFindOneInputDto,
  DiarioProfessorFindOneOutputDto,
} from "@/server/nest/modules/diario-professor/rest";
import {
  HorarioGeradoFindOneInputRestDto,
  HorarioGeradoFindOneOutputRestDto,
} from "@/server/nest/modules/horario-gerado/rest";
import {
  IntervaloDeTempoFindOneInputDto,
  IntervaloDeTempoFindOneOutputDto,
} from "@/server/nest/modules/intervalo-de-tempo/rest/intervalo-de-tempo.rest.dto";

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
export class HorarioGeradoAulaFindOneOutputRestDto {
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
    type: () => HorarioGeradoFindOneOutputRestDto,
    description: "Horario ao qual a aula pertence",
  })
  @Field(() => HorarioGeradoFindOneOutputRestDto)
  @ValidateNested()
  @Type(() => HorarioGeradoFindOneOutputRestDto)
  horarioGerado: HorarioGeradoFindOneOutputRestDto;

  @ApiProperty({ description: "Data e hora da criacao do registro" })
  @Field()
  @IsDateString()
  dateCreated: Date;

  @ApiProperty({ description: "Data e hora da alteracao do registro" })
  @Field()
  @IsDateString()
  dateUpdated: Date;

  @ApiPropertyOptional({ description: "Data e hora da exclusao do registro", nullable: true })
  @Field(() => Date, { nullable: true })
  @IsOptional()
  @IsDateString()
  dateDeleted: Date | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ArgsType()
export class HorarioGeradoAulaListInputRestDto extends PaginationInputDto {
  @ApiPropertyOptional({
    description: "Filtro por ID",
    type: [String],
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.id"?: string[];

  @ApiPropertyOptional({
    description: "Filtro por ID do Horario Gerado",
    type: [String],
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.horarioGerado.id"?: string[];
}

@ObjectType("HorarioGeradoAulaListOutput")
export class HorarioGeradoAulaListOutputRestDto {
  @ApiProperty({ type: () => PaginationMetaDto, description: "Metadados da busca" })
  @Field(() => PaginationMetaDto)
  meta: PaginationMetaDto;

  @ApiProperty({
    type: () => [HorarioGeradoAulaFindOneOutputRestDto],
    description: "Resultados da busca",
  })
  @Field(() => [HorarioGeradoAulaFindOneOutputRestDto])
  data: HorarioGeradoAulaFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@InputType("HorarioGeradoAulaCreateInput")
export class HorarioGeradoAulaCreateInputRestDto {
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
    type: () => HorarioGeradoFindOneInputRestDto,
    description: "Horario ao qual a aula pertence",
  })
  @Field(() => HorarioGeradoFindOneInputRestDto)
  @ValidateNested()
  @Type(() => HorarioGeradoFindOneInputRestDto)
  horarioGerado: HorarioGeradoFindOneInputRestDto;
}

@InputType("HorarioGeradoAulaUpdateInput")
export class HorarioGeradoAulaUpdateInputRestDto extends PartialType(
  HorarioGeradoAulaCreateInputRestDto,
) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ArgsType()
@InputType("HorarioGeradoAulaFindOneInput")
export class HorarioGeradoAulaFindOneInputRestDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;
}
