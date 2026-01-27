import { ArgsType, Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsInt, IsOptional, IsString } from "class-validator";
import { PaginationInputDto, PaginationMetaDto, TransformToArray } from "@/shared/dto";
import { RegisterModel, simpleProperty } from "@/shared/metadata";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("Estado")
@RegisterModel({
  name: "EstadoFindOneOutput",
  properties: [simpleProperty("id"), simpleProperty("nome"), simpleProperty("sigla")],
})
export class EstadoFindOneOutputDto {
  @ApiProperty({ description: "Identificador do registro (numerico)" })
  @Field(() => Int)
  @IsInt()
  id: number;

  @ApiProperty({ description: "Nome oficial do estado" })
  @Field()
  @IsString()
  nome: string;

  @ApiProperty({ description: "Sigla do estado" })
  @Field()
  @IsString()
  sigla: string;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ArgsType()
@InputType("EstadoListInput")
export class EstadoListInputDto extends PaginationInputDto {
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

@ObjectType("EstadoListOutput")
export class EstadoListOutputDto {
  @ApiProperty({ type: () => PaginationMetaDto, description: "Metadados da busca" })
  @Field(() => PaginationMetaDto)
  meta: PaginationMetaDto;

  @ApiProperty({ type: () => [EstadoFindOneOutputDto], description: "Resultados da busca" })
  @Field(() => [EstadoFindOneOutputDto])
  data: EstadoFindOneOutputDto[];
}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ArgsType()
export class EstadoFindOneInputDto {
  @ApiProperty({ description: "Identificador do registro (numerico)" })
  @Field(() => Int)
  @Type(() => Number)
  @IsInt()
  id: number;
}
