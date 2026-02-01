import { ArgsType, Field, ObjectType } from "@nestjs/graphql";
import { IsArray, IsOptional, IsString } from "class-validator";
import { PaginationGraphqlArgsDto } from "@/modules/@shared/infrastructure/graphql";
import { PaginationMetaDto } from "@/modules/@shared/infrastructure/presentation/rest/dtos";
import { HorarioGeradoFindOneOutputRestDto } from "../rest/horario-gerado.rest.dto";

// ============================================================================
// List Input (GraphQL-compatible - no dots in field names)
// ============================================================================

@ArgsType()
export class HorarioGeradoListInputGqlDto extends PaginationGraphqlArgsDto {
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

  @Field(() => [String], { nullable: true, description: "Filtro por nome do Calendario" })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  filterCalendarioNome?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por ano do Calendario" })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  filterCalendarioAno?: string[];
}

// ============================================================================
// List Output (reuses the same output DTOs - they're already GraphQL-compatible)
// ============================================================================

@ObjectType("HorarioGeradoListResult")
export class HorarioGeradoListOutputGqlDto {
  @Field(() => PaginationMetaDto)
  meta: PaginationMetaDto;

  @Field(() => [HorarioGeradoFindOneOutputRestDto])
  data: HorarioGeradoFindOneOutputRestDto[];
}
