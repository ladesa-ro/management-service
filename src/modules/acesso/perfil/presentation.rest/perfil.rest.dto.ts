import {
  perfilFindOneInputSchema,
  perfilPaginationInputSchema,
  perfilSetVinculosInputSchema,
} from "@/modules/acesso/perfil/domain/perfil.schemas";
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
  commonProperties,
  RegisterModel,
  referenceProperty,
  simpleProperty,
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
@RegisterModel({
  name: "PerfilFindOneQueryResult",
  properties: [
    simpleProperty("id"),
    simpleProperty("ativo"),
    simpleProperty("cargo"),
    referenceProperty("campus", "CampusFindOneQueryResult"),
    referenceProperty("usuario", "UsuarioFindOneQueryResult"),
    ...commonProperties.dated,
  ],
})
export class PerfilFindOneOutputRestDto extends EntityBaseRestDto {
  @ApiProperty({ type: "boolean", description: "Indica se o vinculo esta ativo" })
  ativo: boolean;

  @ApiProperty({ type: "string", description: "Cargo do usuario no vinculo" })
  cargo: string;

  @ApiProperty({
    type: () => CampusFindOneOutputRestDto,
    description: "Campus associado ao vinculo",
  })
  campus: CampusFindOneOutputRestDto;

  @ApiProperty({
    type: () => UsuarioFindOneOutputRestDto,
    description: "Usuario associado ao vinculo",
  })
  usuario: UsuarioFindOneOutputRestDto;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ApiSchema({ name: "PerfilListInputDto" })
export class PerfilListInputRestDto extends PaginatedFilterByIdRestDto {
  static schema = perfilPaginationInputSchema;

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    description: "Filtro por ativo",
  })
  @TransformToArray()
  "filter.ativo"?: string[];

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    description: "Filtro por cargo",
  })
  @TransformToArray()
  "filter.cargo"?: string[];

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    description: "Filtro por ID do Campus",
  })
  @TransformToArray()
  "filter.campus.id"?: string[];

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    description: "Filtro por ID do Usuario",
  })
  @TransformToArray()
  "filter.usuario.id"?: string[];
}

@ApiSchema({ name: "PerfilListOutputDto" })
export class PerfilListOutputRestDto {
  @ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" })
  meta: PaginationMetaRestDto;

  @ApiProperty({ type: () => [PerfilFindOneOutputRestDto], description: "Resultados da busca" })
  data: PerfilFindOneOutputRestDto[];
}

// ============================================================================
// SetVinculos Input
// ============================================================================

@ApiSchema({ name: "PerfilSetVinculosInputDto" })
export class PerfilSetVinculosInputRestDto {
  static schema = perfilSetVinculosInputSchema;

  @ApiProperty({
    type: "string",
    isArray: true,
    description: "Lista de cargos que o usuario tera no campus",
    example: ["professor", "coordenador"],
  })
  cargos: string[];

  @ApiProperty({
    type: () => CampusFindOneInputRestDto,
    description: "Campus onde os vinculos serao definidos",
  })
  campus: CampusFindOneInputRestDto;

  @ApiProperty({
    type: () => UsuarioFindOneInputRestDto,
    description: "Usuario que recebera os vinculos",
  })
  usuario: UsuarioFindOneInputRestDto;
}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "PerfilFindOneInputDto" })
export class PerfilFindOneInputRestDto {
  static schema = perfilFindOneInputSchema;

  @ApiProperty({
    type: "string",
    description: "Identificador do registro (uuid)",
    format: "uuid",
  })
  id: string;
}
