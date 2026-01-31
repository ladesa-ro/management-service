import { ArgsType, Field, ID, InputType, ObjectType } from "@nestjs/graphql";
import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsArray,
  IsDateString,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
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
  AmbienteFindOneInputDto,
  AmbienteFindOneOutputDto,
} from "@/server/nest/modules/ambiente/rest";
import { DiarioFindOneInputDto, DiarioFindOneOutputDto } from "@/server/nest/modules/diario/rest";
import {
  IntervaloDeTempoFindOneInputDto,
  IntervaloDeTempoFindOneOutputDto,
} from "@/server/nest/modules/intervalo-de-tempo/rest";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("Aula")
@RegisterModel({
  name: "AulaFindOneOutput",
  properties: [
    simpleProperty("id"),
    simpleProperty("data"),
    simpleProperty("modalidade", { nullable: true }),
    referenceProperty("intervaloDeTempo", "IntervaloDeTempoFindOneOutput"),
    referenceProperty("diario", "DiarioFindOneOutput"),
    referenceProperty("ambiente", "AmbienteFindOneOutput", { nullable: true }),
    ...commonProperties.dated,
  ],
})
export class AulaFindOneOutputDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;

  @ApiProperty({ description: "Data da aula" })
  @Field()
  @IsDateString()
  data: string;

  @ApiPropertyOptional({ description: "Modalidade da aula", nullable: true })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(1)
  modalidade: string | null;

  @ApiProperty({
    type: () => IntervaloDeTempoFindOneOutputDto,
    description: "Intervalo de tempo associado a aula",
  })
  @Field(() => IntervaloDeTempoFindOneOutputDto)
  @ValidateNested()
  @Type(() => IntervaloDeTempoFindOneOutputDto)
  intervaloDeTempo: IntervaloDeTempoFindOneOutputDto;

  @ApiProperty({ type: () => DiarioFindOneOutputDto, description: "Diario associado a aula" })
  @Field(() => DiarioFindOneOutputDto)
  @ValidateNested()
  @Type(() => DiarioFindOneOutputDto)
  diario: DiarioFindOneOutputDto;

  @ApiPropertyOptional({
    type: () => AmbienteFindOneOutputDto,
    description: "Ambiente associado a aula",
    nullable: true,
  })
  @Field(() => AmbienteFindOneOutputDto, { nullable: true })
  @IsOptional()
  @ValidateNested()
  @Type(() => AmbienteFindOneOutputDto)
  ambiente: AmbienteFindOneOutputDto | null;

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
@InputType("AulaListInput")
export class AulaListInputDto extends PaginationInputDto {
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
    description: "Filtro por ID do Intervalo de Tempo",
    type: [String],
  })
  @TransformToArray()
  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.intervaloDeTempo.id"?: string[];

  @ApiPropertyOptional({
    description: "Filtro por ID do Diario",
    type: [String],
  })
  @TransformToArray()
  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.diario.id"?: string[];

  @ApiPropertyOptional({
    description: "Filtro por ID do Ambiente",
    type: [String],
  })
  @TransformToArray()
  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.ambiente.id"?: string[];
}

@ObjectType("AulaListOutput")
export class AulaListOutputDto {
  @ApiProperty({ type: () => PaginationMetaDto, description: "Metadados da busca" })
  @Field(() => PaginationMetaDto)
  meta: PaginationMetaDto;

  @ApiProperty({ type: () => [AulaFindOneOutputDto], description: "Resultados da busca" })
  @Field(() => [AulaFindOneOutputDto])
  data: AulaFindOneOutputDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@InputType("AulaCreateInput")
export class AulaCreateInputDto {
  @ApiProperty({ description: "Data da aula" })
  @Field()
  @IsDateString()
  data: string;

  @ApiPropertyOptional({ description: "Modalidade da aula", nullable: true })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(1)
  modalidade?: string | null;

  @ApiProperty({
    type: () => IntervaloDeTempoFindOneInputDto,
    description: "Intervalo de tempo associado a aula",
  })
  @Field(() => IntervaloDeTempoFindOneInputDto)
  @ValidateNested()
  @Type(() => IntervaloDeTempoFindOneInputDto)
  intervaloDeTempo: IntervaloDeTempoFindOneInputDto;

  @ApiProperty({ type: () => DiarioFindOneInputDto, description: "Diario associado a aula" })
  @Field(() => DiarioFindOneInputDto)
  @ValidateNested()
  @Type(() => DiarioFindOneInputDto)
  diario: DiarioFindOneInputDto;

  @ApiPropertyOptional({
    type: () => AmbienteFindOneInputDto,
    description: "Ambiente associado a aula",
    nullable: true,
  })
  @Field(() => AmbienteFindOneInputDto, { nullable: true })
  @IsOptional()
  @ValidateNested()
  @Type(() => AmbienteFindOneInputDto)
  ambiente?: AmbienteFindOneInputDto | null;
}

@InputType("AulaUpdateInput")
export class AulaUpdateInputDto extends PartialType(AulaCreateInputDto) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ArgsType()
@InputType("AulaFindOneInput")
export class AulaFindOneInputDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;
}
