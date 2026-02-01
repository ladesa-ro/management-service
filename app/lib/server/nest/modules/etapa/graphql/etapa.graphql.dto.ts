import { ArgsType, Field, ObjectType } from "@nestjs/graphql";
import { IsArray, IsOptional, IsString } from "class-validator";
import { PaginationGraphqlArgsDto } from "@/modules/@shared/infrastructure/graphql/dtos/pagination-graphql.dto";
import { PaginationMetaDto } from "@/modules/@shared/infrastructure/presentation/rest/dtos";
import { EtapaFindOneOutputRestDto } from "../rest/etapa.rest.dto";

// ============================================================================
// List Input (GraphQL-compatible - no dots in field names)
// ============================================================================

@ArgsType()
export class EtapaListInputGqlDto extends PaginationGraphqlArgsDto {
  @Field(() => [String], { nullable: true, description: "Filtro por ID" })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  filterId?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por ID do Calendario" })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  filterCalendarioId?: string[];
}

// ============================================================================
// List Output (reuses the same output DTOs - they're already GraphQL-compatible)
// ============================================================================

@ObjectType("EtapaListResult")
export class EtapaListOutputGqlDto {
  @Field(() => PaginationMetaDto)
  meta: PaginationMetaDto;

  @Field(() => [EtapaFindOneOutputRestDto])
  data: EtapaFindOneOutputRestDto[];
}
