import { PerfilFindOneOutputRestDto } from "@/modules/acesso/usuario/perfil/presentation.rest/perfil.rest.dto";
import { CursoFindOneOutputRestDto } from "@/modules/ensino/curso/presentation.rest/curso.rest.dto";
import { EstagiarioCreateCommandFields } from "@/modules/estagio/estagiario/domain/commands/estagiario-create.command";
import { EstagiarioUpdateCommandFields } from "@/modules/estagio/estagiario/domain/commands/estagiario-update.command";
import {
  EstagiarioCreateSchema,
  EstagiarioUpdateSchema,
} from "@/modules/estagio/estagiario/domain/estagiario.schemas";
import { EstagiarioFindOneQueryFields } from "@/modules/estagio/estagiario/domain/queries/estagiario-find-one.query";
import { EstagiarioFindOneQueryResultFields } from "@/modules/estagio/estagiario/domain/queries/estagiario-find-one.query.result";
import { EstagiarioFindOneInputSchema } from "@/modules/estagio/estagiario/domain/queries/estagiario-find-one.query.schemas";
import { EstagiarioListQueryFields } from "@/modules/estagio/estagiario/domain/queries/estagiario-list.query";
import { EstagiarioPaginationInputSchema } from "@/modules/estagio/estagiario/domain/queries/estagiario-list.query.schemas";
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

@ApiSchema({ name: "EstagiarioFindOneOutputDto" })
export class EstagiarioFindOneOutputRestDto extends EntityBaseRestDto {
  @ApiProperty({
    ...EstagiarioFindOneQueryResultFields.perfil.swaggerMetadata,
    type: () => PerfilFindOneOutputRestDto,
  })
  perfil: PerfilFindOneOutputRestDto | null;

  @ApiProperty({
    ...EstagiarioFindOneQueryResultFields.curso.swaggerMetadata,
    type: () => CursoFindOneOutputRestDto,
  })
  curso: CursoFindOneOutputRestDto | null;

  @ApiProperty({
    ...EstagiarioFindOneQueryResultFields.periodo.swaggerMetadata,
  })
  periodo: string;

  @ApiProperty(EstagiarioFindOneQueryResultFields.telefone.swaggerMetadata)
  telefone: string;

  @ApiPropertyOptional(EstagiarioFindOneQueryResultFields.emailInstitucional.swaggerMetadata)
  emailInstitucional: string | null = null;

  @ApiProperty(EstagiarioFindOneQueryResultFields.dataNascimento.swaggerMetadata)
  dataNascimento: string;

  @ApiProperty(EstagiarioFindOneQueryResultFields.ativo.swaggerMetadata)
  ativo: boolean;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ApiSchema({ name: "EstagiarioListInputDto" })
export class EstagiarioListInputRestDto extends PaginatedFilterByIdRestDto {
  static schema = EstagiarioPaginationInputSchema;

  @ApiPropertyOptional(EstagiarioListQueryFields.filterPerfilId.swaggerMetadata)
  @TransformToArray()
  "filter.perfil.id"?: string[];

  @ApiPropertyOptional(EstagiarioListQueryFields.filterCursoId.swaggerMetadata)
  @TransformToArray()
  "filter.curso.id"?: string[];

  @ApiPropertyOptional(EstagiarioListQueryFields.filterPeriodo.swaggerMetadata)
  @TransformToArray()
  "filter.periodo"?: string[];
}

@ApiSchema({ name: "EstagiarioListOutputDto" })
export class EstagiarioListOutputRestDto {
  @ApiProperty({
    ...EstagiarioListQueryFields.meta.swaggerMetadata,
    type: () => PaginationMetaRestDto,
  })
  meta: PaginationMetaRestDto;

  @ApiProperty({
    ...EstagiarioListQueryFields.data.swaggerMetadata,
    type: () => [EstagiarioFindOneOutputRestDto],
  })
  data: EstagiarioFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@ApiSchema({ name: "EstagiarioCreateInputDto" })
export class EstagiarioCreateInputRestDto {
  static schema = EstagiarioCreateSchema.presentation;

  @ApiProperty(EstagiarioCreateCommandFields.perfil.swaggerMetadata)
  perfil: { id: string };

  @ApiProperty(EstagiarioCreateCommandFields.curso.swaggerMetadata)
  curso: { id: string };

  @ApiProperty(EstagiarioCreateCommandFields.periodo.swaggerMetadata)
  periodo: string;

  @ApiProperty(EstagiarioCreateCommandFields.telefone.swaggerMetadata)
  telefone: string;

  @ApiProperty(EstagiarioCreateCommandFields.emailInstitucional.swaggerMetadata)
  emailInstitucional: string;

  @ApiProperty(EstagiarioCreateCommandFields.dataNascimento.swaggerMetadata)
  dataNascimento: string;
}

@ApiSchema({ name: "EstagiarioUpdateInputDto" })
export class EstagiarioUpdateInputRestDto {
  static schema = EstagiarioUpdateSchema.presentation;

  @ApiPropertyOptional(EstagiarioUpdateCommandFields.perfil.swaggerMetadata)
  perfil?: { id: string };

  @ApiPropertyOptional(EstagiarioUpdateCommandFields.curso.swaggerMetadata)
  curso?: { id: string };

  @ApiPropertyOptional(EstagiarioUpdateCommandFields.periodo.swaggerMetadata)
  periodo?: string;

  @ApiPropertyOptional(EstagiarioUpdateCommandFields.telefone.swaggerMetadata)
  telefone?: string;

  @ApiPropertyOptional(EstagiarioUpdateCommandFields.emailInstitucional.swaggerMetadata)
  emailInstitucional?: string;

  @ApiPropertyOptional(EstagiarioUpdateCommandFields.dataNascimento.swaggerMetadata)
  dataNascimento?: string;
}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "EstagiarioFindOneInputDto" })
export class EstagiarioFindOneInputRestDto {
  static schema = EstagiarioFindOneInputSchema;

  @ApiProperty(EstagiarioFindOneQueryFields.id.swaggerMetadata)
  id: string;
}
