import {
  EntityBaseGraphQlDto,
  PaginatedFilterByIdGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/modules/@shared/infrastructure/graphql/dtos";
import { ArgsType, Field, InputType, ObjectType } from "@/modules/@shared/presentation/graphql";
import {
  IsArray,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from "@/modules/@shared/presentation/shared";
import { UsuarioFindOneOutputGraphQlDto } from "@/modules/acesso/usuario/presentation.graphql/usuario.graphql.dto";
import { CampusFindOneOutputGraphQlDto } from "@/modules/ambientes/campus/presentation.graphql/campus.graphql.dto";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("PerfilFindOneOutputDto")
export class PerfilFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @Field(() => Boolean) ativo: boolean;
  @Field(() => String) cargo: string;
  @Field(() => CampusFindOneOutputGraphQlDto) campus: CampusFindOneOutputGraphQlDto;
  @Field(() => UsuarioFindOneOutputGraphQlDto) usuario: UsuarioFindOneOutputGraphQlDto;
}

// ============================================================================
// SetVinculos Input
// ============================================================================

@InputType("PerfilRefInputDto")
export class PerfilRefInputGraphQlDto {
  @Field(() => String) @IsString() id: string;
}

@InputType("PerfilSetVinculosInputDto")
export class PerfilSetVinculosInputGraphQlDto {
  @Field(() => [String])
  @IsArray()
  @IsString({ each: true })
  cargos: string[];
  @Field(() => PerfilRefInputGraphQlDto)
  @ValidateNested()
  campus: PerfilRefInputGraphQlDto;
  @Field(() => PerfilRefInputGraphQlDto)
  @ValidateNested()
  usuario: PerfilRefInputGraphQlDto;
}

// ============================================================================
// List Input
// ============================================================================

@ArgsType()
export class PerfilListInputGraphQlDto extends PaginatedFilterByIdGraphQlDto {
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
