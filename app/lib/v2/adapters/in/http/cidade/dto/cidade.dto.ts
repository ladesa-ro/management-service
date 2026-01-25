import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { ArgsType, Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { IsArray, IsInt, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { PaginationInputDto, PaginationMetaDto } from "@/shared/dto";
import { referenceProperty, RegisterModel, simpleProperty, } from "@/shared/metadata";
import { EstadoFindOneOutputDto } from "@/v2/adapters/in/http/estado/dto";

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
  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.id"?: string[];
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
