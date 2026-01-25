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
import { PaginationInputDto, PaginationMetaDto } from "@/shared/dto";
import {
  commonProperties,
  RegisterModel,
  referenceProperty,
  simpleProperty,
} from "@/shared/metadata";
import {
  CalendarioLetivoFindOneInputDto,
  CalendarioLetivoFindOneOutputDto,
} from "@/v2/adapters/in/http/calendario-letivo/dto";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("HorarioGerado")
@RegisterModel({
  name: "HorarioGeradoFindOneOutput",
  properties: [
    simpleProperty("id"),
    simpleProperty("status", { nullable: true }),
    simpleProperty("tipo", { nullable: true }),
    simpleProperty("dataGeracao", { nullable: true }),
    simpleProperty("vigenciaInicio", { nullable: true }),
    simpleProperty("vigenciaFim", { nullable: true }),
    referenceProperty("calendario", "CalendarioLetivoFindOneOutput"),
    ...commonProperties.dated,
  ],
})
export class HorarioGeradoFindOneOutputDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;

  @ApiPropertyOptional({ description: "Status do horario gerado", nullable: true })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  status: string | null;

  @ApiPropertyOptional({ description: "Tipo do horario gerado", nullable: true })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  tipo: string | null;

  @ApiPropertyOptional({ description: "Data em que o horario foi gerado", nullable: true })
  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  dataGeracao: Date | null;

  @ApiPropertyOptional({ description: "Inicio da vigencia do horario gerado", nullable: true })
  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  vigenciaInicio: Date | null;

  @ApiPropertyOptional({ description: "Fim da vigencia do horario gerado", nullable: true })
  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  vigenciaFim: Date | null;

  @ApiProperty({ type: () => CalendarioLetivoFindOneOutputDto, description: "Calendario letivo" })
  @Field(() => CalendarioLetivoFindOneOutputDto)
  @ValidateNested()
  @Type(() => CalendarioLetivoFindOneOutputDto)
  calendario: CalendarioLetivoFindOneOutputDto;

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
@InputType("HorarioGeradoListInput")
export class HorarioGeradoListInputDto extends PaginationInputDto {
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

@ObjectType("HorarioGeradoListOutput")
export class HorarioGeradoListOutputDto {
  @ApiProperty({ type: () => PaginationMetaDto, description: "Metadados da busca" })
  @Field(() => PaginationMetaDto)
  meta: PaginationMetaDto;

  @ApiProperty({ type: () => [HorarioGeradoFindOneOutputDto], description: "Resultados da busca" })
  @Field(() => [HorarioGeradoFindOneOutputDto])
  data: HorarioGeradoFindOneOutputDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@InputType("HorarioGeradoCreateInput")
export class HorarioGeradoCreateInputDto {
  @ApiPropertyOptional({ description: "Status do horario gerado", nullable: true })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  status?: string | null;

  @ApiPropertyOptional({ description: "Tipo do horario gerado", nullable: true })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  tipo?: string | null;

  @ApiPropertyOptional({ description: "Data em que o horario foi gerado", nullable: true })
  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  dataGeracao?: Date | null;

  @ApiPropertyOptional({ description: "Inicio da vigencia do horario gerado", nullable: true })
  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  vigenciaInicio?: Date | null;

  @ApiPropertyOptional({ description: "Fim da vigencia do horario gerado", nullable: true })
  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  vigenciaFim?: Date | null;

  @ApiProperty({ type: () => CalendarioLetivoFindOneInputDto, description: "Calendario letivo" })
  @Field(() => CalendarioLetivoFindOneInputDto)
  @ValidateNested()
  @Type(() => CalendarioLetivoFindOneInputDto)
  calendario: CalendarioLetivoFindOneInputDto;
}

@InputType("HorarioGeradoUpdateInput")
export class HorarioGeradoUpdateInputDto extends PartialType(HorarioGeradoCreateInputDto) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ArgsType()
@InputType("HorarioGeradoFindOneInput")
export class HorarioGeradoFindOneInputDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;
}
