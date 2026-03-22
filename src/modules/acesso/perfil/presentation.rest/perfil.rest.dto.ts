import { PerfilSetVinculosCommandFields } from "@/modules/acesso/perfil/domain/commands/perfil-set-vinculos.command";
import { PerfilSetVinculosInputSchema } from "@/modules/acesso/perfil/domain/perfil.schemas";
import { PerfilFindOneQueryFields } from "@/modules/acesso/perfil/domain/queries/perfil-find-one.query";
import { PerfilFindOneQueryResultFields } from "@/modules/acesso/perfil/domain/queries/perfil-find-one.query.result";
import { PerfilFindOneInputSchema } from "@/modules/acesso/perfil/domain/queries/perfil-find-one.query.schemas";
import { PerfilListQueryFields } from "@/modules/acesso/perfil/domain/queries/perfil-list.query";
import { PerfilPaginationInputSchema } from "@/modules/acesso/perfil/domain/queries/perfil-list.query.schemas";
import {
  UsuarioFindOneInputRestDto,
  UsuarioFindOneOutputRestDto,
} from "@/modules/acesso/usuario/presentation.rest";
import {
  CampusFindOneInputRestDto,
  CampusFindOneOutputRestDto,
} from "@/modules/ambientes/campus/presentation.rest";
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
// Parent Route Params
// ============================================================================

@ApiSchema({ name: "PerfilParentParamsDto" })
export class PerfilParentParamsRestDto {
  @ApiProperty({
    type: "string",
    description: "ID do usuario (uuid)",
    format: "uuid",
  })
  usuarioId: string;
}

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
    type: () => CampusFindOneOutputRestDto,
    ...PerfilFindOneQueryResultFields.campus.swaggerMetadata,
  })
  campus: CampusFindOneOutputRestDto;

  @ApiProperty({
    type: () => UsuarioFindOneOutputRestDto,
    ...PerfilFindOneQueryResultFields.usuario.swaggerMetadata,
  })
  usuario: UsuarioFindOneOutputRestDto;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ApiSchema({ name: "PerfilListInputDto" })
export class PerfilListInputRestDto extends PaginatedFilterByIdRestDto {
  static schema = PerfilPaginationInputSchema;

  @ApiPropertyOptional(PerfilListQueryFields.filterAtivo.swaggerMetadata)
  @TransformToArray()
  "filter.ativo"?: string[];

  @ApiPropertyOptional(PerfilListQueryFields.filterCargo.swaggerMetadata)
  @TransformToArray()
  "filter.cargo"?: string[];

  @ApiPropertyOptional(PerfilListQueryFields.filterCampusId.swaggerMetadata)
  @TransformToArray()
  "filter.campus.id"?: string[];

  @ApiPropertyOptional(PerfilListQueryFields.filterUsuarioId.swaggerMetadata)
  @TransformToArray()
  "filter.usuario.id"?: string[];
}

@ApiSchema({ name: "PerfilListOutputDto" })
export class PerfilListOutputRestDto {
  @ApiProperty({ type: () => PaginationMetaRestDto, ...PerfilListQueryFields.meta.swaggerMetadata })
  meta: PaginationMetaRestDto;

  @ApiProperty({
    type: () => [PerfilFindOneOutputRestDto],
    ...PerfilListQueryFields.data.swaggerMetadata,
  })
  data: PerfilFindOneOutputRestDto[];
}

// ============================================================================
// SetVinculos Input
// ============================================================================

@ApiSchema({ name: "PerfilSetVinculosInputDto" })
export class PerfilSetVinculosInputRestDto {
  static schema = PerfilSetVinculosInputSchema;

  @ApiProperty(PerfilSetVinculosCommandFields.cargos.swaggerMetadata)
  cargos: string[];

  @ApiProperty({
    type: () => CampusFindOneInputRestDto,
    ...PerfilSetVinculosCommandFields.campus.swaggerMetadata,
  })
  campus: CampusFindOneInputRestDto;

  @ApiProperty({
    type: () => UsuarioFindOneInputRestDto,
    ...PerfilSetVinculosCommandFields.usuario.swaggerMetadata,
  })
  usuario: UsuarioFindOneInputRestDto;
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
