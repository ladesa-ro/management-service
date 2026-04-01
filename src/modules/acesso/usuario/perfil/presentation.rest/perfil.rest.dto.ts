import { PerfilFindOneQueryFields } from "@/modules/acesso/usuario/perfil/domain/queries/perfil-find-one.query";
import { PerfilFindOneQueryResultFields } from "@/modules/acesso/usuario/perfil/domain/queries/perfil-find-one.query.result";
import { PerfilFindOneInputSchema } from "@/modules/acesso/usuario/perfil/domain/queries/perfil-find-one.query.schemas";
import { UsuarioFindOneOutputRestDto } from "@/modules/acesso/usuario/presentation.rest";
import { CampusFindOneOutputRestDto } from "@/modules/ambientes/campus/presentation.rest";
import { ApiProperty, ApiSchema } from "@/shared/presentation/rest";
import { EntityBaseRestDto } from "@/shared/presentation/rest/dtos";

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "PerfilFindOneOutputDto" })
export class PerfilFindOneOutputRestDto extends EntityBaseRestDto {
  @ApiProperty(PerfilFindOneQueryResultFields.ativo.swaggerMetadata)
  ativo: boolean;

  @ApiProperty(PerfilFindOneQueryResultFields.cargo.swaggerMetadata)
  cargo: string;

  @ApiProperty({
    ...PerfilFindOneQueryResultFields.campus.swaggerMetadata,
    type: () => CampusFindOneOutputRestDto,
  })
  campus: CampusFindOneOutputRestDto;

  @ApiProperty({
    ...PerfilFindOneQueryResultFields.usuario.swaggerMetadata,
    type: () => UsuarioFindOneOutputRestDto,
  })
  usuario: UsuarioFindOneOutputRestDto;
}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "PerfilFindOneInputDto" })
export class PerfilFindOneInputRestDto {
  static schema = PerfilFindOneInputSchema;

  @ApiProperty(PerfilFindOneQueryFields.id.swaggerMetadata)
  id: string;
}
