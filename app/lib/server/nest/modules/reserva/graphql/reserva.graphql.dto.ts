import { ArgsType, Field, ObjectType } from "@nestjs/graphql";
import { IsArray, IsOptional, IsString } from "class-validator";
import { PaginationGraphqlArgsDto } from "@/modules/@shared/infrastructure/graphql";
import { PaginationMetaDto } from "@/modules/@shared/infrastructure/presentation/rest/dtos";
import { ReservaFindOneOutputDto } from "../rest/reserva.rest.dto";

// ============================================================================
// List Input (GraphQL-compatible - no dots in field names)
// ============================================================================

@ArgsType()
export class ReservaListInputGqlDto extends PaginationGraphqlArgsDto {
  @Field(() => [String], { nullable: true, description: "Filtro por ID" })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  filterId?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por situacao" })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  filterSituacao?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por tipo" })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  filterTipo?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por ID do Ambiente" })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  filterAmbienteId?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por ID do Bloco do Ambiente" })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  filterAmbienteBlocoId?: string[];

  @Field(() => [String], {
    nullable: true,
    description: "Filtro por ID do Campus do Bloco do Ambiente",
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  filterAmbienteBlocoCampusId?: string[];
}

// ============================================================================
// List Output (reuses the same output DTOs - they're already GraphQL-compatible)
// ============================================================================

@ObjectType("ReservaListResult")
export class ReservaListOutputGqlDto {
  @Field(() => PaginationMetaDto)
  meta: PaginationMetaDto;

  @Field(() => [ReservaFindOneOutputDto])
  data: ReservaFindOneOutputDto[];
}
