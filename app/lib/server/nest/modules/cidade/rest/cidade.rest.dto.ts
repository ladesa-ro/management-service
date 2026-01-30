import { ArgsType, Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsInt, IsOptional, IsString, ValidateNested } from "class-validator";
import { EstadoFindOneOutputDto } from "@/server/nest/modules/estado/rest/estado.rest.dto";
import { PaginationInputDto, PaginationMetaDto, TransformToArray } from "@/v2/old/shared/dto";
import { RegisterModel, referenceProperty, simpleProperty } from "@/v2/old/shared/metadata";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("Cidade")
@RegisterModel({
  name: "CidadeFindOneOutput",
  properties: [
    simpleProperty("id"),
    simpleProperty("nome"),
    referenceProperty("estado", "EstadoFindOneOutput"),
  ],
})
export class CidadeFindOneOutputDto {
  @ApiProperty({ description: "Identificador do registro (numerico)" })
  @Field(() => Int)
  @IsInt()
  id: number;

  @ApiProperty({ description: "Nome oficial da cidade" })
  @Field()
  @IsString()
  nome: string;

  @ApiProperty({ type: () => EstadoFindOneOutputDto, description: "Estado da cidade" })
  @Field(() => EstadoFindOneOutputDto)
  @ValidateNested()
  @Type(() => EstadoFindOneOutputDto)
  estado: EstadoFindOneOutputDto;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ArgsType()
@InputType("CidadeListInput")
export class CidadeListInputDto extends PaginationInputDto {
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
    description: "Filtro por ID do Estado",
    type: [String],
  })
  @TransformToArray()
  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.estado.id"?: string[];

  @ApiPropertyOptional({
    description: "Filtro por nome do Estado",
    type: [String],
  })
  @TransformToArray()
  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.estado.nome"?: string[];

  @ApiPropertyOptional({
    description: "Filtro por sigla do Estado",
    type: [String],
  })
  @TransformToArray()
  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.estado.sigla"?: string[];
}

@ObjectType("CidadeListOutput")
export class CidadeListOutputDto {
  @ApiProperty({ type: () => PaginationMetaDto, description: "Metadados da busca" })
  @Field(() => PaginationMetaDto)
  meta: PaginationMetaDto;

  @ApiProperty({ type: () => [CidadeFindOneOutputDto], description: "Resultados da busca" })
  @Field(() => [CidadeFindOneOutputDto])
  data: CidadeFindOneOutputDto[];
}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ArgsType()
export class CidadeFindOneInputDto {
  @ApiProperty({ description: "Identificador do registro (numerico)" })
  @Field(() => Int)
  @Type(() => Number)
  @IsInt()
  id: number;
}
