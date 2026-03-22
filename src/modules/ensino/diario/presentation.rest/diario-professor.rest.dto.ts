import { PerfilFindOneOutputRestDto } from "@/modules/acesso/perfil/presentation.rest";
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
import { DiarioFindOneOutputRestDto } from "./diario.rest.dto";

// ============================================================================
// Parent Route Params
// ============================================================================

@ApiSchema({ name: "DiarioProfessorParentParamsDto" })
export class DiarioProfessorParentParamsRestDto {
  @ApiProperty({
    type: "string",
    description: "ID do diario (uuid)",
    format: "uuid",
  })
  diarioId: string;
}

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "DiarioProfessorFindOneOutputDto" })
@RegisterModel({
  name: "DiarioProfessorFindOneQueryResult",
  properties: [
    simpleProperty("id"),
    simpleProperty("situacao"),
    referenceProperty("perfil", "PerfilFindOneQueryResult"),
    referenceProperty("diario", "DiarioFindOneQueryResult"),
    ...commonProperties.dated,
  ],
})
export class DiarioProfessorFindOneOutputRestDto extends EntityBaseRestDto {
  @ApiProperty({ type: "boolean", description: "Situacao do vinculo" })
  situacao: boolean;

  @ApiProperty({
    type: () => PerfilFindOneOutputRestDto,
    description: "Perfil do usuario ao campus",
  })
  perfil: PerfilFindOneOutputRestDto;

  @ApiProperty({ type: () => DiarioFindOneOutputRestDto, description: "Diario vinculado" })
  diario: DiarioFindOneOutputRestDto;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ApiSchema({ name: "DiarioProfessorListInputDto" })
export class DiarioProfessorListInputRestDto extends PaginatedFilterByIdRestDto {
  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    description: "Filtro por ID do Usuario do Perfil",
  })
  @TransformToArray()
  "filter.perfil.usuario.id"?: string[];

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    description: "Filtro por ID do Perfil",
  })
  @TransformToArray()
  "filter.perfil.id"?: string[];
}

@ApiSchema({ name: "DiarioProfessorListOutputDto" })
export class DiarioProfessorListOutputRestDto {
  @ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" })
  meta: PaginationMetaRestDto;

  @ApiProperty({
    type: () => [DiarioProfessorFindOneOutputRestDto],
    description: "Resultados da busca",
  })
  data: DiarioProfessorFindOneOutputRestDto[];
}

// ============================================================================
// Bulk Replace Input
// ============================================================================

@ApiSchema({ name: "DiarioProfessorBulkReplaceItemDto" })
export class DiarioProfessorBulkReplaceItemRestDto {
  @ApiProperty({ type: "string", description: "ID do perfil (uuid)", format: "uuid" })
  perfilId: string;

  @ApiProperty({ type: "boolean", description: "Situacao do vinculo" })
  situacao: boolean;
}

@ApiSchema({ name: "DiarioProfessorBulkReplaceInputDto" })
export class DiarioProfessorBulkReplaceInputRestDto {
  @ApiProperty({
    type: () => [DiarioProfessorBulkReplaceItemRestDto],
    description: "Lista de professores para vincular ao diario",
  })
  professores: DiarioProfessorBulkReplaceItemRestDto[];
}
