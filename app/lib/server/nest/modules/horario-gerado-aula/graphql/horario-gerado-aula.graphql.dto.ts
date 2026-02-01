import { ArgsType, Field, ObjectType } from "@nestjs/graphql";
import { IsArray, IsOptional, IsString } from "class-validator";
import { PaginationGraphqlArgsDto } from "@/modules/@shared/infrastructure/graphql";
import { PaginationMetaDto } from "@/modules/@shared/infrastructure/presentation/rest/dtos";
import { HorarioGeradoAulaFindOneOutputRestDto } from "../rest/horario-gerado-aula.rest.dto";

// ============================================================================
// List Input (GraphQL-compatible - no dots in field names)
// ============================================================================

@ArgsType()
export class HorarioGeradoAulaListInputGqlDto extends PaginationGraphqlArgsDto {
  @Field(() => [String], { nullable: true, description: "Filtro por ID" })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  filterId?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por ID do Horario Gerado" })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  filterHorarioGeradoId?: string[];
}

// ============================================================================
// List Output (reuses the same output DTOs - they're already GraphQL-compatible)
// ============================================================================

@ObjectType("HorarioGeradoAulaListResult")
export class HorarioGeradoAulaListOutputGqlDto {
  @Field(() => PaginationMetaDto)
  meta: PaginationMetaDto;

  @Field(() => [HorarioGeradoAulaFindOneOutputRestDto])
  data: HorarioGeradoAulaFindOneOutputRestDto[];
}
