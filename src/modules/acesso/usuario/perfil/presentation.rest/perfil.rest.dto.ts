import { PerfilFindOneQueryFields } from "@/modules/acesso/usuario/perfil/domain/queries/perfil-find-one.query";
import { PerfilFindOneQueryResultFields } from "@/modules/acesso/usuario/perfil/domain/queries/perfil-find-one.query.result";
import { PerfilFindOneInputSchema } from "@/modules/acesso/usuario/perfil/domain/queries/perfil-find-one.query.schemas";
import { PerfilListQueryFields } from "@/modules/acesso/usuario/perfil/domain/queries/perfil-list.query";
import { PerfilPaginationInputSchema } from "@/modules/acesso/usuario/perfil/domain/queries/perfil-list.query.schemas";
import { UsuarioFindOneOutputRestDto } from "@/modules/acesso/usuario/presentation.rest";
import { CampusFindOneOutputRestDto } from "@/modules/ambientes/campus/presentation.rest";
import {
  ApiProperty,
  ApiPropertyOptional,
  ApiSchema,
  TransformToArray,
} from "@/shared/presentation/rest";
import {
  EntityBaseRestDto,
  PaginatedFilterByIdRestDto,
  PaginationMetaRestDto,
} from "@/shared/presentation/rest/dtos";

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

// ============================================================================
// List Input/Output
// ============================================================================

@ApiSchema({ name: "PerfilListInputDto" })
export class PerfilListInputRestDto extends PaginatedFilterByIdRestDto {
  static schema = PerfilPaginationInputSchema;

  @ApiPropertyOptional(PerfilListQueryFields.filterCampusId.swaggerMetadata)
  @TransformToArray()
  "filter.campus.id"?: string[];

  @ApiPropertyOptional(PerfilListQueryFields.filterUsuarioId.swaggerMetadata)
  @TransformToArray()
  "filter.usuario.id"?: string[];

  @ApiPropertyOptional(PerfilListQueryFields.filterCargoNome.swaggerMetadata)
  @TransformToArray()
  "filter.cargo.nome"?: string[];
}

@ApiSchema({ name: "PerfilListOutputDto" })
export class PerfilListOutputRestDto {
  @ApiProperty({
    ...PerfilListQueryFields.meta.swaggerMetadata,
    type: () => PaginationMetaRestDto,
  })
  meta: PaginationMetaRestDto;

  @ApiProperty({
    ...PerfilListQueryFields.data.swaggerMetadata,
    type: () => [PerfilFindOneOutputRestDto],
  })
  data: PerfilFindOneOutputRestDto[];
}
