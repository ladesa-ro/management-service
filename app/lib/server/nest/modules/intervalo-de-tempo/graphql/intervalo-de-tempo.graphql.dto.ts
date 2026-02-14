import { ArgsType, Field, ObjectType } from "@nestjs/graphql";
import { IsArray, IsOptional, IsUUID } from "class-validator";
import {
  EntityBaseGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/modules/@shared/infrastructure/graphql/dtos";
import { PaginationInputGraphQlDto } from "@/modules/@shared/infrastructure/graphql/dtos/pagination-graphql.dto";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("IntervaloDeTempoFindOneOutputDto")
export class IntervaloDeTempoFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @Field() periodoInicio: string;
  @Field() periodoFim: string;
}

// ============================================================================
// List Input
// ============================================================================

@ArgsType()
export class IntervaloDeTempoListInputGraphQlDto extends PaginationInputGraphQlDto {
  @Field(() => [String], { nullable: true, description: "Filtro por ID" })
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  filterId?: string[];
}

// ============================================================================
// List Output
// ============================================================================

@ObjectType("IntervaloDeTempoListResult")
export class IntervaloDeTempoListOutputGraphQlDto {
  @Field(() => PaginationMetaGraphQlDto)
  meta: PaginationMetaGraphQlDto;

  @Field(() => [IntervaloDeTempoFindOneOutputGraphQlDto])
  data: IntervaloDeTempoFindOneOutputGraphQlDto[];
}
