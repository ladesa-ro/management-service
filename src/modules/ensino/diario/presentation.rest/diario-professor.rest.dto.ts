import { PerfilFindOneOutputRestDto } from "@/modules/acesso/usuario/perfil/presentation.rest";
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
import { DiarioProfessorBulkReplaceCommandFields } from "../domain/commands/diario-professor-bulk-replace.command";
import { DiarioProfessorFindOneQueryResultFields } from "../domain/queries/diario-professor-find-one.query.result";
import { DiarioProfessorListQueryFields } from "../domain/queries/diario-professor-list.query";
import { DiarioFindOneOutputRestDto } from "./diario.rest.dto";

// ============================================================================
// Parent Route Params
// ============================================================================

@ApiSchema({ name: "DiarioProfessorParentParamsDto" })
export class DiarioProfessorParentParamsRestDto {
  @ApiProperty({
    type: "string",
    ...DiarioProfessorBulkReplaceCommandFields.diarioId.swaggerMetadata,
    format: "uuid",
  })
  diarioId: string;
}

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "DiarioProfessorFindOneOutputDto" })
export class DiarioProfessorFindOneOutputRestDto extends EntityBaseRestDto {
  @ApiProperty({
    type: "boolean",
    ...DiarioProfessorFindOneQueryResultFields.situacao.swaggerMetadata,
  })
  situacao: boolean;

  @ApiProperty({
    ...DiarioProfessorFindOneQueryResultFields.perfil.swaggerMetadata,
    type: () => PerfilFindOneOutputRestDto,
  })
  perfil: PerfilFindOneOutputRestDto;

  @ApiProperty({
    ...DiarioProfessorFindOneQueryResultFields.diario.swaggerMetadata,
    type: () => DiarioFindOneOutputRestDto,
  })
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
    ...DiarioProfessorListQueryFields.filterPerfilUsuarioId.swaggerMetadata,
  })
  @TransformToArray()
  "filter.perfil.usuario.id"?: string[];

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    ...DiarioProfessorListQueryFields.filterPerfilId.swaggerMetadata,
  })
  @TransformToArray()
  "filter.perfil.id"?: string[];
}

@ApiSchema({ name: "DiarioProfessorListOutputDto" })
export class DiarioProfessorListOutputRestDto {
  @ApiProperty({
    ...DiarioProfessorListQueryFields.meta.swaggerMetadata,
    type: () => PaginationMetaRestDto,
  })
  meta: PaginationMetaRestDto;

  @ApiProperty({
    ...DiarioProfessorListQueryFields.data.swaggerMetadata,
    type: () => [DiarioProfessorFindOneOutputRestDto],
  })
  data: DiarioProfessorFindOneOutputRestDto[];
}

// ============================================================================
// Bulk Replace Input
// ============================================================================

@ApiSchema({ name: "DiarioProfessorBulkReplaceItemDto" })
export class DiarioProfessorBulkReplaceItemRestDto {
  @ApiProperty({
    type: "string",
    ...DiarioProfessorBulkReplaceCommandFields.perfilId.swaggerMetadata,
    format: "uuid",
  })
  perfilId: string;

  @ApiProperty({
    type: "boolean",
    ...DiarioProfessorBulkReplaceCommandFields.situacao.swaggerMetadata,
  })
  situacao: boolean;
}

@ApiSchema({ name: "DiarioProfessorBulkReplaceInputDto" })
export class DiarioProfessorBulkReplaceInputRestDto {
  @ApiProperty({
    ...DiarioProfessorBulkReplaceCommandFields.professores.swaggerMetadata,
    type: () => [DiarioProfessorBulkReplaceItemRestDto],
  })
  professores: DiarioProfessorBulkReplaceItemRestDto[];
}
