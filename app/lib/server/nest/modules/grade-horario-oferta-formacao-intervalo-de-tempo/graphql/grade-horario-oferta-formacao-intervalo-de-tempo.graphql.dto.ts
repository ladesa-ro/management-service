import { ArgsType, Field, ObjectType } from "@nestjs/graphql";
import { IsArray, IsOptional, IsString } from "class-validator";
import { PaginationGraphqlArgsDto } from "@/modules/@shared/infrastructure/graphql/dtos/pagination-graphql.dto";
import { PaginationMetaDto } from "@/modules/@shared/infrastructure/presentation/rest/dtos";
import { GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputRestDto } from "../rest/grade-horario-oferta-formacao-intervalo-de-tempo.rest.dto";

// ============================================================================
// List Input (GraphQL-compatible - no dots in field names)
// ============================================================================

@ArgsType()
export class GradeHorarioOfertaFormacaoIntervaloDeTempoListInputGqlDto extends PaginationGraphqlArgsDto {
  @Field(() => [String], { nullable: true, description: "Filtro por ID" })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  filterId?: string[];
}

// ============================================================================
// List Output (reuses the same output DTOs - they're already GraphQL-compatible)
// ============================================================================

@ObjectType("GradeHorarioOfertaFormacaoIntervaloDeTempoListResult")
export class GradeHorarioOfertaFormacaoIntervaloDeTempoListOutputGqlDto {
  @Field(() => PaginationMetaDto)
  meta: PaginationMetaDto;

  @Field(() => [GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputRestDto])
  data: GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputRestDto[];
}
