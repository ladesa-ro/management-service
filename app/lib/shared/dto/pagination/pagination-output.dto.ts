import { ApiProperty } from "@nestjs/swagger";
import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Type } from "@nestjs/common";

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

  @ApiProperty({ description: "Ordenacao", isArray: true })
  @Field(() => [[String]])
  sortBy: [string, string][];

  @ApiProperty({ description: "Filtros" })
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
