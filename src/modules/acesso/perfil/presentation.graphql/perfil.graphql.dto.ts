import {
  EntityBaseGraphQlDto,
  PaginatedFilterByIdGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/infrastructure.graphql/dtos";
import { PerfilSetVinculosCommandFields } from "@/modules/acesso/perfil/domain/commands/perfil-set-vinculos.command";
import { PerfilSetVinculosInputSchema } from "@/modules/acesso/perfil/domain/perfil.schemas";
import { PerfilFindOneQueryResultFields } from "@/modules/acesso/perfil/domain/queries/perfil-find-one.query.result";
import { PerfilListQueryFields } from "@/modules/acesso/perfil/domain/queries/perfil-list.query";
import { PerfilGraphqlListInputSchema } from "@/modules/acesso/perfil/domain/queries/perfil-list.query.schemas";
import { UsuarioFindOneOutputGraphQlDto } from "@/modules/acesso/usuario/presentation.graphql/usuario.graphql.dto";
import { CampusFindOneOutputGraphQlDto } from "@/modules/ambientes/campus/presentation.graphql/campus.graphql.dto";
import { ArgsType, Field, InputType, ObjectType } from "@/shared/presentation/graphql";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("PerfilFindOneOutputDto")
export class PerfilFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @Field(() => Boolean, PerfilFindOneQueryResultFields.ativo.gqlMetadata) ativo: boolean;
  @Field(() => String, PerfilFindOneQueryResultFields.cargo.gqlMetadata) cargo: string;
  @Field(() => CampusFindOneOutputGraphQlDto, PerfilFindOneQueryResultFields.campus.gqlMetadata)
  campus: CampusFindOneOutputGraphQlDto;
  @Field(() => UsuarioFindOneOutputGraphQlDto, PerfilFindOneQueryResultFields.usuario.gqlMetadata)
  usuario: UsuarioFindOneOutputGraphQlDto;
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
  static schema = PerfilSetVinculosInputSchema;

  @Field(() => [String], PerfilSetVinculosCommandFields.cargos.gqlMetadata)
  cargos: string[];
  @Field(() => PerfilRefInputGraphQlDto, PerfilSetVinculosCommandFields.campus.gqlMetadata)
  campus: PerfilRefInputGraphQlDto;
  @Field(() => PerfilRefInputGraphQlDto, PerfilSetVinculosCommandFields.usuario.gqlMetadata)
  usuario: PerfilRefInputGraphQlDto;
}

// ============================================================================
// List Input
// ============================================================================

@ArgsType()
export class PerfilListInputGraphQlDto extends PaginatedFilterByIdGraphQlDto {
  static schema = PerfilGraphqlListInputSchema;

  @Field(() => [String], PerfilListQueryFields.filterAtivo.gqlMetadata)
  filterAtivo?: string[];

  @Field(() => [String], PerfilListQueryFields.filterCargo.gqlMetadata)
  filterCargo?: string[];

  @Field(() => [String], PerfilListQueryFields.filterCampusId.gqlMetadata)
  filterCampusId?: string[];

  @Field(() => [String], PerfilListQueryFields.filterUsuarioId.gqlMetadata)
  filterUsuarioId?: string[];
}

// ============================================================================
// List Output
// ============================================================================

@ObjectType("PerfilListResult")
export class PerfilListOutputGraphQlDto {
  @Field(() => PaginationMetaGraphQlDto, PerfilListQueryFields.meta.gqlMetadata)
  meta: PaginationMetaGraphQlDto;

  @Field(() => [PerfilFindOneOutputGraphQlDto], PerfilListQueryFields.data.gqlMetadata)
  data: PerfilFindOneOutputGraphQlDto[];
}
