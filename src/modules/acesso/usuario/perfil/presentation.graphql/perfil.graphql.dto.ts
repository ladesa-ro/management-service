import { EntityBaseGraphQlDto } from "@/infrastructure.graphql/dtos";
import { PerfilFindOneQueryResultFields } from "@/modules/acesso/usuario/perfil/domain/queries/perfil-find-one.query.result";
import { UsuarioFindOneOutputGraphQlDto } from "@/modules/acesso/usuario/presentation.graphql/usuario.graphql.dto";
import { CampusFindOneOutputGraphQlDto } from "@/modules/ambientes/campus/presentation.graphql/campus.graphql.dto";
import { Field, ObjectType } from "@/shared/presentation/graphql";

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
