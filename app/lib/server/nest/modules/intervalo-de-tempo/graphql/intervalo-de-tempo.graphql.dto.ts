import { ArgsType, Field, ObjectType } from "@nestjs/graphql";
import { decorate } from "ts-mixer";
import {
  EntityBaseGraphQlDto,
  PaginatedFilterByIdGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/modules/@shared/infrastructure/graphql/dtos";

// ============================================================================
// FindOne Output
// ============================================================================

@decorate(ObjectType("IntervaloDeTempoFindOneOutputDto"))
export class IntervaloDeTempoFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @decorate(Field(() => String)) periodoInicio: string;
  @decorate(Field(() => String)) periodoFim: string;
}

// ============================================================================
// List Input
// ============================================================================

@decorate(ArgsType())
export class IntervaloDeTempoListInputGraphQlDto extends PaginatedFilterByIdGraphQlDto {}

// ============================================================================
// List Output
// ============================================================================

@decorate(ObjectType("IntervaloDeTempoListResult"))
export class IntervaloDeTempoListOutputGraphQlDto {
  @decorate(Field(() => PaginationMetaGraphQlDto))
  meta: PaginationMetaGraphQlDto;

  @decorate(Field(() => [IntervaloDeTempoFindOneOutputGraphQlDto]))
  data: IntervaloDeTempoFindOneOutputGraphQlDto[];
}
