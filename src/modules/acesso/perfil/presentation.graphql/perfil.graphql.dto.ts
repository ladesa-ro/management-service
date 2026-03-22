import {
  EntityBaseGraphQlDto,
  PaginatedFilterByIdGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/infrastructure.graphql/dtos";
import {
  perfilGraphqlListInputSchema,
  perfilSetVinculosInputSchema,
} from "@/modules/acesso/perfil/domain/perfil.schemas";
import { UsuarioFindOneOutputGraphQlDto } from "@/modules/acesso/usuario/presentation.graphql/usuario.graphql.dto";
import { CampusFindOneOutputGraphQlDto } from "@/modules/ambientes/campus/presentation.graphql/campus.graphql.dto";
import { ArgsType, Field, InputType, ObjectType } from "@/shared/presentation/graphql";

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
  @Field(() => String) id: string;
}

@InputType("PerfilSetVinculosInputDto")
export class PerfilSetVinculosInputGraphQlDto {
  static schema = perfilSetVinculosInputSchema;

  @Field(() => [String])
  cargos: string[];
  @Field(() => PerfilRefInputGraphQlDto)
  campus: PerfilRefInputGraphQlDto;
  @Field(() => PerfilRefInputGraphQlDto)
  usuario: PerfilRefInputGraphQlDto;
}

// ============================================================================
// List Input
// ============================================================================

@ArgsType()
export class PerfilListInputGraphQlDto extends PaginatedFilterByIdGraphQlDto {
  static schema = perfilGraphqlListInputSchema;

  @Field(() => [String], { nullable: true, description: "Filtro por ativo" })
  filterAtivo?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por cargo" })
  filterCargo?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por ID do Campus" })
  filterCampusId?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por ID do Usuario" })
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
