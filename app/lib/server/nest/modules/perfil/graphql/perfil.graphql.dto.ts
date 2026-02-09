import { ArgsType, Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsArray, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";
import {
  EntityBaseGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/modules/@shared/infrastructure/graphql/dtos";
import { PaginationArgsGraphQlDto } from "@/modules/@shared/infrastructure/graphql/dtos/pagination-graphql.dto";
import { CampusFindOneOutputGraphQlDto } from "@/server/nest/modules/campus/graphql/campus.graphql.dto";
import { UsuarioFindOneOutputGraphQlDto } from "@/server/nest/modules/usuario/graphql/usuario.graphql.dto";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("PerfilFindOneOutputDto")
export class PerfilFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @Field() ativo: boolean;
  @Field() cargo: string;
  @Field(() => CampusFindOneOutputGraphQlDto) campus: CampusFindOneOutputGraphQlDto;
  @Field(() => UsuarioFindOneOutputGraphQlDto) usuario: UsuarioFindOneOutputGraphQlDto;
}

// ============================================================================
// SetVinculos Input
// ============================================================================

@InputType("PerfilRefInputDto")
export class PerfilRefInputGraphQlDto {
  @Field() @IsString() id: string;
}

@InputType("PerfilSetVinculosInputDto")
export class PerfilSetVinculosInputGraphQlDto {
  @Field(() => [String]) @IsArray() @IsString({ each: true }) cargos: string[];
  @Field(() => PerfilRefInputGraphQlDto) @ValidateNested() campus: PerfilRefInputGraphQlDto;
  @Field(() => PerfilRefInputGraphQlDto) @ValidateNested() usuario: PerfilRefInputGraphQlDto;
}

// ============================================================================
// List Input
// ============================================================================

@ArgsType()
export class PerfilListInputGraphQlDto extends PaginationArgsGraphQlDto {
  @Field(() => [String], { nullable: true, description: "Filtro por ID" })
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  filterId?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por ativo" })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  filterAtivo?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por cargo" })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  filterCargo?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por ID do Campus" })
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  filterCampusId?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por ID do Usuario" })
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  filterUsuarioId?: string[];
}

// ============================================================================
// List Output
// ============================================================================

@ObjectType("PerfilListResult")
export class PerfilListOutputGraphQlDto {
  @Field(() => PaginationMetaGraphQlDto)
  meta: PaginationMetaGraphQlDto;

  @Field(() => [PerfilFindOneOutputGraphQlDto])
  data: PerfilFindOneOutputGraphQlDto[];
}
