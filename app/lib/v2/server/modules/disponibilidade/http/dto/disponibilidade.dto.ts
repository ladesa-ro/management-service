import { ArgsType, Field, ID, InputType, ObjectType } from "@nestjs/graphql";
import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { IsArray, IsDateString, IsOptional, IsString, IsUUID } from "class-validator";
import { PaginationInputDto, PaginationMetaDto, TransformToArray } from "@/old/shared/dto";
import { commonProperties, RegisterModel, simpleProperty } from "@/old/shared/metadata";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("Disponibilidade")
@RegisterModel({
  name: "DisponibilidadeFindOneOutput",
  properties: [
    simpleProperty("id"),
    simpleProperty("dataInicio"),
    simpleProperty("dataFim", { nullable: true }),
    ...commonProperties.dated,
  ],
})
export class DisponibilidadeFindOneOutputDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;

  @ApiProperty({ description: "Data de inicio" })
  @Field()
  @IsDateString()
  dataInicio: Date;

  @ApiPropertyOptional({ description: "Data de termino", nullable: true })
  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  dataFim: Date | null;

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
@InputType("DisponibilidadeListInput")
export class DisponibilidadeListInputDto extends PaginationInputDto {
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

@ObjectType("DisponibilidadeListOutput")
export class DisponibilidadeListOutputDto {
  @ApiProperty({ type: () => PaginationMetaDto, description: "Metadados da busca" })
  @Field(() => PaginationMetaDto)
  meta: PaginationMetaDto;

  @ApiProperty({
    type: () => [DisponibilidadeFindOneOutputDto],
    description: "Resultados da busca",
  })
  @Field(() => [DisponibilidadeFindOneOutputDto])
  data: DisponibilidadeFindOneOutputDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@InputType("DisponibilidadeCreateInput")
export class DisponibilidadeCreateInputDto {
  @ApiProperty({ description: "Data de inicio" })
  @Field()
  @IsDateString()
  dataInicio: Date;

  @ApiPropertyOptional({ description: "Data de termino", nullable: true })
  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  dataFim?: Date | null;
}

@InputType("DisponibilidadeUpdateInput")
export class DisponibilidadeUpdateInputDto extends PartialType(DisponibilidadeCreateInputDto) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ArgsType()
@InputType("DisponibilidadeFindOneInput")
export class DisponibilidadeFindOneInputDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;
}
