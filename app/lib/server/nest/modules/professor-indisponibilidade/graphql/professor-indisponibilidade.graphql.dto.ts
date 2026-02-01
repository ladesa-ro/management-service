import { ArgsType, Field, ID, ObjectType } from "@nestjs/graphql";
import { IsOptional, IsUUID } from "class-validator";
import { PaginationGraphqlArgsDto } from "@/modules/@shared/infrastructure/graphql";
import { PaginationMetaDto } from "@/modules/@shared/infrastructure/presentation/rest/dtos";
import { ProfessorIndisponibilidadeFindOneOutputDto } from "../rest/professor-indisponibilidade.rest.dto";

// ============================================================================
// List Input (GraphQL-compatible - no dots in field names)
// ============================================================================

@ArgsType()
export class ProfessorIndisponibilidadeListInputGqlDto extends PaginationGraphqlArgsDto {
  @Field(() => ID, { nullable: true, description: "Filtro por ID do perfil" })
  @IsOptional()
  @IsUUID()
  filterPerfilId?: string;
}

// ============================================================================
// List Output (reuses the same output DTOs - they're already GraphQL-compatible)
// ============================================================================

@ObjectType("ProfessorIndisponibilidadeListResult")
export class ProfessorIndisponibilidadeListOutputGqlDto {
  @Field(() => PaginationMetaDto)
  meta: PaginationMetaDto;

  @Field(() => [ProfessorIndisponibilidadeFindOneOutputDto])
  data: ProfessorIndisponibilidadeFindOneOutputDto[];
}
