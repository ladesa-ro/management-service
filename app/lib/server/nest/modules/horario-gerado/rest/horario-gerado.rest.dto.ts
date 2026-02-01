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
  CalendarioLetivoFindOneInputDto,
  CalendarioLetivoFindOneOutputDto,
} from "@/server/nest/modules/calendario-letivo/rest";

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
export class HorarioGeradoFindOneOutputRestDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;

  @ApiPropertyOptional({ description: "Status do horario gerado", nullable: true })
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  status: string | null;

  @ApiPropertyOptional({ description: "Tipo do horario gerado", nullable: true })
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  tipo: string | null;

  @ApiPropertyOptional({ description: "Data em que o horario foi gerado", nullable: true })
  @Field(() => Date, { nullable: true })
  @IsOptional()
  @IsDateString()
  dataGeracao: Date | null;

  @ApiPropertyOptional({ description: "Inicio da vigencia do horario gerado", nullable: true })
  @Field(() => Date, { nullable: true })
  @IsOptional()
  @IsDateString()
  vigenciaInicio: Date | null;

  @ApiPropertyOptional({ description: "Fim da vigencia do horario gerado", nullable: true })
  @Field(() => Date, { nullable: true })
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
  @Field(() => Date, { nullable: true })
  @IsOptional()
  @IsDateString()
  dateDeleted: Date | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ArgsType()
export class HorarioGeradoListInputRestDto extends PaginationInputDto {
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
    description: "Filtro por ID do Calendario",
    type: [String],
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.calendario.id"?: string[];

  @ApiPropertyOptional({
    description: "Filtro por nome do Calendario",
    type: [String],
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.calendario.nome"?: string[];

  @ApiPropertyOptional({
    description: "Filtro por ano do Calendario",
    type: [String],
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.calendario.ano"?: string[];
}

@ObjectType("HorarioGeradoListOutput")
export class HorarioGeradoListOutputRestDto {
  @ApiProperty({ type: () => PaginationMetaDto, description: "Metadados da busca" })
  @Field(() => PaginationMetaDto)
  meta: PaginationMetaDto;

  @ApiProperty({
    type: () => [HorarioGeradoFindOneOutputRestDto],
    description: "Resultados da busca",
  })
  @Field(() => [HorarioGeradoFindOneOutputRestDto])
  data: HorarioGeradoFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@InputType("HorarioGeradoCreateInput")
export class HorarioGeradoCreateInputRestDto {
  @ApiPropertyOptional({ description: "Status do horario gerado", nullable: true })
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  status?: string | null;

  @ApiPropertyOptional({ description: "Tipo do horario gerado", nullable: true })
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  tipo?: string | null;

  @ApiPropertyOptional({ description: "Data em que o horario foi gerado", nullable: true })
  @Field(() => Date, { nullable: true })
  @IsOptional()
  @IsDateString()
  dataGeracao?: Date | null;

  @ApiPropertyOptional({ description: "Inicio da vigencia do horario gerado", nullable: true })
  @Field(() => Date, { nullable: true })
  @IsOptional()
  @IsDateString()
  vigenciaInicio?: Date | null;

  @ApiPropertyOptional({ description: "Fim da vigencia do horario gerado", nullable: true })
  @Field(() => Date, { nullable: true })
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
export class HorarioGeradoUpdateInputRestDto extends PartialType(HorarioGeradoCreateInputRestDto) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ArgsType()
@InputType("HorarioGeradoFindOneInput")
export class HorarioGeradoFindOneInputRestDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;
}
