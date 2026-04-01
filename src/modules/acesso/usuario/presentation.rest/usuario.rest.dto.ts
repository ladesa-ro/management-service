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
    ...PerfilFindOneQueryResultFields.campus.swaggerMetadata,
    type: () => CampusFindOneOutputRestDto,
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
    ...UsuarioFindOneQueryResultFields.imagemCapa.swaggerMetadata,
    type: () => ImagemFindOneOutputRestDto,
  })
  imagemCapa: ImagemFindOneOutputRestDto | null;

  @ApiPropertyOptional({
    ...UsuarioFindOneQueryResultFields.imagemPerfil.swaggerMetadata,
    type: () => ImagemFindOneOutputRestDto,
  })
  imagemPerfil: ImagemFindOneOutputRestDto | null;

  @ApiProperty({
    ...UsuarioFindOneQueryResultFields.vinculos.swaggerMetadata,
    type: () => [UsuarioPerfilNestedOutputRestDto],
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
    ...UsuarioEnsinoCursoRefFields.turmas.swaggerMetadata,
    type: () => [UsuarioEnsinoTurmaRefRestDto],
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
    ...UsuarioEnsinoDisciplinaRefFields.cursos.swaggerMetadata,
    type: () => [UsuarioEnsinoCursoRefRestDto],
  })
  cursos: UsuarioEnsinoCursoRefRestDto[];
}

@ApiSchema({ name: "UsuarioEnsinoOutputDto" })
export class UsuarioEnsinoOutputRestDto {
  @ApiProperty({
    ...UsuarioEnsinoOutputFields.usuario.swaggerMetadata,
    type: () => UsuarioFindOneOutputRestDto,
  })
  usuario: UsuarioFindOneOutputRestDto;

  @ApiProperty({
    ...UsuarioEnsinoOutputFields.disciplinas.swaggerMetadata,
    type: () => [UsuarioEnsinoDisciplinaRefRestDto],
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
    ...UsuarioListQueryFields.meta.swaggerMetadata,
    type: () => PaginationMetaRestDto,
  })
  meta: PaginationMetaRestDto;

  @ApiProperty({
    ...UsuarioListQueryFields.data.swaggerMetadata,
    type: () => [UsuarioFindOneOutputRestDto],
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
    ...UsuarioCreateCommandFields.vinculos.swaggerMetadata,
    type: () => [VinculoInputRestDto],
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
    ...UsuarioUpdateCommandFields.vinculos.swaggerMetadata,
    type: () => [VinculoInputRestDto],
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
