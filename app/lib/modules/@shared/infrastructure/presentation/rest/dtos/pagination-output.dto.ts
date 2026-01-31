import { Type } from "@nestjs/common";
import { Field, Int, ObjectType } from "@nestjs/graphql";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

/**
 * Representa uma entrada de ordenação [campo, direcao]
 */
@ObjectType()
export class SortByEntryDto {
  @ApiProperty({ description: "Nome do campo", example: "nome" })
  @Field()
  0: string;

  @ApiProperty({
    description: "Direcao da ordenacao (ASC ou DESC)",
    example: "ASC",
    enum: ["ASC", "DESC"],
  })
  @Field()
  1: string;
}

/**
 * Pagination metadata DTO.
 */
@ObjectType()
export class PaginationMetaDto {
  @ApiProperty({ description: "Quantidade de itens por pagina" })
  @Field(() => Int)
  itemsPerPage: number;

  @ApiProperty({ description: "Total de itens" })
  @Field(() => Int)
  totalItems: number;

  @ApiProperty({ description: "Pagina atual" })
  @Field(() => Int)
  currentPage: number;

  @ApiProperty({ description: "Quantidade total de paginas" })
  @Field(() => Int)
  totalPages: number;

  @ApiProperty({ description: "Termo textual da busca" })
  @Field()
  search: string;

  @ApiProperty({
    description: "Ordenacao aplicada",
    type: "array",
    items: {
      type: "array",
      items: { type: "string" },
      minItems: 2,
      maxItems: 2,
      example: ["nome", "ASC"],
    },
    example: [
      ["nome", "ASC"],
      ["dateCreated", "DESC"],
    ],
  })
  @Field(() => [[String]])
  sortBy: [string, string][];

  @ApiPropertyOptional({
    description: "Filtros aplicados",
    type: "object",
    additionalProperties: true,
  })
  filter?: Record<string, string | string[]>;
}

/**
 * Factory function to create a paginated response type.
 * This creates a new class that extends the base paginated response
 * with the correct item type for both REST and GraphQL.
 */
export function PaginatedResponse<T>(ItemType: Type<T>): Type<{
  meta: PaginationMetaDto;
  data: T[];
}> {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedResponseClass {
    @ApiProperty({ type: () => PaginationMetaDto, description: "Metadados da busca" })
    @Field(() => PaginationMetaDto)
    meta: PaginationMetaDto;

    @ApiProperty({ type: () => [ItemType], description: "Resultados da busca atual" })
    @Field(() => [ItemType])
    data: T[];
  }

  return PaginatedResponseClass as Type<{ meta: PaginationMetaDto; data: T[] }>;
}
