import {
  UsuarioCreateCommandFields,
  type VinculoInput,
} from "@/modules/acesso/usuario/domain/commands/usuario-create.command";
import { UsuarioUpdateCommandFields } from "@/modules/acesso/usuario/domain/commands/usuario-update.command";
import { UsuarioFindOneQueryFields } from "@/modules/acesso/usuario/domain/queries/usuario-find-one.query";
import { UsuarioFindOneQueryResultFields } from "@/modules/acesso/usuario/domain/queries/usuario-find-one.query.result";
import { UsuarioFindOneInputSchema } from "@/modules/acesso/usuario/domain/queries/usuario-find-one.query.schemas";
import { UsuarioListQueryFields } from "@/modules/acesso/usuario/domain/queries/usuario-list.query";
import { UsuarioPaginationInputSchema } from "@/modules/acesso/usuario/domain/queries/usuario-list.query.schemas";
import {
  UsuarioCreateSchema,
  UsuarioUpdateSchema,
} from "@/modules/acesso/usuario/domain/usuario.schemas";
import {
  UsuarioEnsinoCursoRefFields,
  UsuarioEnsinoDisciplinaRefFields,
  UsuarioEnsinoOutputFields,
  UsuarioEnsinoTurmaRefFields,
  VinculoInputFields,
} from "@/modules/acesso/usuario/domain/usuario-ensino.fields";
import { PerfilFindOneQueryResultFields } from "@/modules/acesso/usuario/perfil/domain/queries/perfil-find-one.query.result";
import { ImagemFindOneOutputRestDto } from "@/modules/ambientes/bloco/presentation.rest";
import { CampusFindOneOutputRestDto } from "@/modules/ambientes/campus/presentation.rest";
import { ApiProperty, ApiPropertyOptional, ApiSchema } from "@/shared/presentation/rest";
import {
  EntityBaseRestDto,
  PaginatedFilterByIdRestDto,
  PaginationMetaRestDto,
} from "@/shared/presentation/rest/dtos";

// ============================================================================
// Perfil Nested Output (usado quando perfil é aninhado em usuario)
// ============================================================================

@ApiSchema({ name: "UsuarioPerfilNestedOutputDto" })
export class UsuarioPerfilNestedOutputRestDto extends EntityBaseRestDto {
  @ApiProperty(PerfilFindOneQueryResultFields.ativo.swaggerMetadata)
  ativo: boolean;

  @ApiProperty(PerfilFindOneQueryResultFields.cargo.swaggerMetadata)
  cargo: string;

  @ApiProperty({
    type: () => CampusFindOneOutputRestDto,
    ...PerfilFindOneQueryResultFields.campus.swaggerMetadata,
  })
  campus: CampusFindOneOutputRestDto;
}

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "UsuarioFindOneOutputDto" })
export class UsuarioFindOneOutputRestDto extends EntityBaseRestDto {
  @ApiPropertyOptional(UsuarioFindOneQueryResultFields.nome.swaggerMetadata)
  nome: string | null;

  @ApiPropertyOptional(UsuarioFindOneQueryResultFields.matricula.swaggerMetadata)
  matricula: string | null;

  @ApiPropertyOptional(UsuarioFindOneQueryResultFields.email.swaggerMetadata)
  email: string | null;

  @ApiProperty(UsuarioFindOneQueryResultFields.isSuperUser.swaggerMetadata)
  isSuperUser: boolean;

  @ApiPropertyOptional({
    type: () => ImagemFindOneOutputRestDto,
    ...UsuarioFindOneQueryResultFields.imagemCapa.swaggerMetadata,
  })
  imagemCapa: ImagemFindOneOutputRestDto | null;

  @ApiPropertyOptional({
    type: () => ImagemFindOneOutputRestDto,
    ...UsuarioFindOneQueryResultFields.imagemPerfil.swaggerMetadata,
  })
  imagemPerfil: ImagemFindOneOutputRestDto | null;

  @ApiProperty({
    type: () => [UsuarioPerfilNestedOutputRestDto],
    ...UsuarioFindOneQueryResultFields.vinculos.swaggerMetadata,
  })
  vinculos: UsuarioPerfilNestedOutputRestDto[];
}

// ============================================================================
// Ensino Output (dados de ensino do usuario)
// ============================================================================

@ApiSchema({ name: "UsuarioEnsinoTurmaRefDto" })
export class UsuarioEnsinoTurmaRefRestDto {
  @ApiProperty(UsuarioEnsinoTurmaRefFields.id.swaggerMetadata)
  id: string;

  @ApiProperty(UsuarioEnsinoTurmaRefFields.periodo.swaggerMetadata)
  periodo: string;
}

@ApiSchema({ name: "UsuarioEnsinoCursoRefDto" })
export class UsuarioEnsinoCursoRefRestDto {
  @ApiProperty(UsuarioEnsinoCursoRefFields.id.swaggerMetadata)
  id: string;

  @ApiProperty(UsuarioEnsinoCursoRefFields.nome.swaggerMetadata)
  nome: string;

  @ApiProperty({
    type: () => [UsuarioEnsinoTurmaRefRestDto],
    ...UsuarioEnsinoCursoRefFields.turmas.swaggerMetadata,
  })
  turmas: UsuarioEnsinoTurmaRefRestDto[];
}

@ApiSchema({ name: "UsuarioEnsinoDisciplinaRefDto" })
export class UsuarioEnsinoDisciplinaRefRestDto {
  @ApiProperty(UsuarioEnsinoDisciplinaRefFields.id.swaggerMetadata)
  id: string;

  @ApiProperty(UsuarioEnsinoDisciplinaRefFields.nome.swaggerMetadata)
  nome: string;

  @ApiProperty({
    type: () => [UsuarioEnsinoCursoRefRestDto],
    ...UsuarioEnsinoDisciplinaRefFields.cursos.swaggerMetadata,
  })
  cursos: UsuarioEnsinoCursoRefRestDto[];
}

@ApiSchema({ name: "UsuarioEnsinoOutputDto" })
export class UsuarioEnsinoOutputRestDto {
  @ApiProperty({
    type: () => UsuarioFindOneOutputRestDto,
    ...UsuarioEnsinoOutputFields.usuario.swaggerMetadata,
  })
  usuario: UsuarioFindOneOutputRestDto | null;

  @ApiProperty({
    type: () => [UsuarioEnsinoDisciplinaRefRestDto],
    ...UsuarioEnsinoOutputFields.disciplinas.swaggerMetadata,
  })
  disciplinas: UsuarioEnsinoDisciplinaRefRestDto[];
}

// ============================================================================
// List Input/Output
// ============================================================================

@ApiSchema({ name: "UsuarioListInputDto" })
export class UsuarioListInputRestDto extends PaginatedFilterByIdRestDto {
  static schema = UsuarioPaginationInputSchema;

  @ApiPropertyOptional(UsuarioListQueryFields.filterVinculosCargo.swaggerMetadata)
  "filter.vinculos.cargo.nome"?: string;
}

@ApiSchema({ name: "UsuarioListOutputDto" })
export class UsuarioListOutputRestDto {
  @ApiProperty({
    type: () => PaginationMetaRestDto,
    ...UsuarioListQueryFields.meta.swaggerMetadata,
  })
  meta: PaginationMetaRestDto;

  @ApiProperty({
    type: () => [UsuarioFindOneOutputRestDto],
    ...UsuarioListQueryFields.data.swaggerMetadata,
  })
  data: UsuarioFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@ApiSchema({ name: "VinculoInputDto" })
export class VinculoInputRestDto {
  @ApiProperty(VinculoInputFields.campus.swaggerMetadata)
  campus: { id: string };

  @ApiProperty(VinculoInputFields.cargo.swaggerMetadata)
  cargo: string;
}

@ApiSchema({ name: "UsuarioCreateInputDto" })
export class UsuarioCreateInputRestDto {
  static schema = UsuarioCreateSchema.presentation;

  @ApiPropertyOptional(UsuarioCreateCommandFields.nome.swaggerMetadata)
  nome?: string | null;

  @ApiPropertyOptional(UsuarioCreateCommandFields.matricula.swaggerMetadata)
  matricula?: string | null;

  @ApiPropertyOptional(UsuarioCreateCommandFields.email.swaggerMetadata)
  email?: string | null;

  @ApiPropertyOptional({
    type: () => [VinculoInputRestDto],
    ...UsuarioCreateCommandFields.vinculos.swaggerMetadata,
  })
  vinculos?: VinculoInput[];
}

@ApiSchema({ name: "UsuarioUpdateInputDto" })
export class UsuarioUpdateInputRestDto {
  static schema = UsuarioUpdateSchema.presentation;

  @ApiPropertyOptional(UsuarioUpdateCommandFields.nome.swaggerMetadata)
  nome?: string | null;

  @ApiPropertyOptional(UsuarioUpdateCommandFields.matricula.swaggerMetadata)
  matricula?: string | null;

  @ApiPropertyOptional(UsuarioUpdateCommandFields.email.swaggerMetadata)
  email?: string | null;

  @ApiPropertyOptional({
    type: () => [VinculoInputRestDto],
    ...UsuarioUpdateCommandFields.vinculos.swaggerMetadata,
  })
  vinculos?: VinculoInput[];
}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "UsuarioFindOneInputDto" })
export class UsuarioFindOneInputRestDto {
  static schema = UsuarioFindOneInputSchema;

  @ApiProperty(UsuarioFindOneQueryFields.id.swaggerMetadata)
  id: string;
}
