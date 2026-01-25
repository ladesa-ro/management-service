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
  DisponibilidadeFindOneInputDto,
  DisponibilidadeFindOneOutputDto,
} from "@/v2/server/modules/disponibilidade/http/dto";
import { TurmaFindOneInputDto, TurmaFindOneOutputDto } from "@/v2/server/modules/turma/http/dto";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("TurmaDisponibilidade")
@RegisterModel({
  name: "TurmaDisponibilidadeFindOneOutput",
  properties: [
    simpleProperty("id"),
    referenceProperty("disponibilidade", "DisponibilidadeFindOneOutput"),
    referenceProperty("turma", "TurmaFindOneOutput"),
    ...commonProperties.dated,
  ],
})
export class TurmaDisponibilidadeFindOneOutputDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;

  @ApiProperty({ type: () => DisponibilidadeFindOneOutputDto, description: "Disponibilidade" })
  @Field(() => DisponibilidadeFindOneOutputDto)
  @ValidateNested()
  @Type(() => DisponibilidadeFindOneOutputDto)
  disponibilidade: DisponibilidadeFindOneOutputDto;

  @ApiProperty({ type: () => TurmaFindOneOutputDto, description: "Turma" })
  @Field(() => TurmaFindOneOutputDto)
  @ValidateNested()
  @Type(() => TurmaFindOneOutputDto)
  turma: TurmaFindOneOutputDto;

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
@InputType("TurmaDisponibilidadeListInput")
export class TurmaDisponibilidadeListInputDto extends PaginationInputDto {
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

@ObjectType("TurmaDisponibilidadeListOutput")
export class TurmaDisponibilidadeListOutputDto {
  @ApiProperty({ type: () => PaginationMetaDto, description: "Metadados da busca" })
  @Field(() => PaginationMetaDto)
  meta: PaginationMetaDto;

  @ApiProperty({
    type: () => [TurmaDisponibilidadeFindOneOutputDto],
    description: "Resultados da busca",
  })
  @Field(() => [TurmaDisponibilidadeFindOneOutputDto])
  data: TurmaDisponibilidadeFindOneOutputDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@InputType("TurmaDisponibilidadeCreateInput")
export class TurmaDisponibilidadeCreateInputDto {
  @ApiProperty({ type: () => DisponibilidadeFindOneInputDto, description: "Disponibilidade" })
  @Field(() => DisponibilidadeFindOneInputDto)
  @ValidateNested()
  @Type(() => DisponibilidadeFindOneInputDto)
  disponibilidade: DisponibilidadeFindOneInputDto;

  @ApiProperty({ type: () => TurmaFindOneInputDto, description: "Turma" })
  @Field(() => TurmaFindOneInputDto)
  @ValidateNested()
  @Type(() => TurmaFindOneInputDto)
  turma: TurmaFindOneInputDto;
}

@InputType("TurmaDisponibilidadeUpdateInput")
export class TurmaDisponibilidadeUpdateInputDto extends PartialType(
  TurmaDisponibilidadeCreateInputDto,
) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ArgsType()
@InputType("TurmaDisponibilidadeFindOneInput")
export class TurmaDisponibilidadeFindOneInputDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;
}
