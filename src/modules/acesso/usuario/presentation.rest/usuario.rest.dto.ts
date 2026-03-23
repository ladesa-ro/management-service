import { UsuarioCreateCommandFields } from "@/modules/acesso/usuario/domain/commands/usuario-create.command";
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
import { ImagemFindOneOutputRestDto } from "@/modules/ambientes/bloco/presentation.rest";
import { ApiProperty, ApiPropertyOptional, ApiSchema } from "@/shared/presentation/rest";
import {
  EntityBaseRestDto,
  PaginatedFilterByIdRestDto,
  PaginationMetaRestDto,
} from "@/shared/presentation/rest/dtos";

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
}

// ============================================================================
// Ensino Output (dados de ensino do usuario)
// ============================================================================

@ApiSchema({ name: "UsuarioEnsinoTurmaRefDto" })
export class UsuarioEnsinoTurmaRefRestDto {
  @ApiProperty({ type: "string", description: "ID da turma", format: "uuid" })
  id: string;

  @ApiProperty({ type: "string", description: "Periodo da turma" })
  periodo: string;
}

@ApiSchema({ name: "UsuarioEnsinoCursoRefDto" })
export class UsuarioEnsinoCursoRefRestDto {
  @ApiProperty({ type: "string", description: "ID do curso", format: "uuid" })
  id: string;

  @ApiProperty({ type: "string", description: "Nome do curso" })
  nome: string;

  @ApiProperty({
    description: "Turmas do curso onde o usuario leciona",
    type: () => [UsuarioEnsinoTurmaRefRestDto],
  })
  turmas: UsuarioEnsinoTurmaRefRestDto[];
}

@ApiSchema({ name: "UsuarioEnsinoDisciplinaRefDto" })
export class UsuarioEnsinoDisciplinaRefRestDto {
  @ApiProperty({ type: "string", description: "ID da disciplina", format: "uuid" })
  id: string;

  @ApiProperty({ type: "string", description: "Nome da disciplina" })
  nome: string;

  @ApiProperty({
    description: "Cursos onde o usuario leciona esta disciplina",
    type: () => [UsuarioEnsinoCursoRefRestDto],
  })
  cursos: UsuarioEnsinoCursoRefRestDto[];
}

@ApiSchema({ name: "UsuarioEnsinoOutputDto" })
export class UsuarioEnsinoOutputRestDto {
  @ApiProperty({ description: "Dados do usuario", type: () => UsuarioFindOneOutputRestDto })
  usuario: UsuarioFindOneOutputRestDto;

  @ApiProperty({
    description: "Disciplinas onde o usuario leciona (com cursos e turmas)",
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
  "filter.vinculos.cargo"?: string;
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

@ApiSchema({ name: "UsuarioCreateInputDto" })
export class UsuarioCreateInputRestDto {
  static schema = UsuarioCreateSchema.presentation;

  @ApiPropertyOptional(UsuarioCreateCommandFields.nome.swaggerMetadata)
  nome?: string | null;

  @ApiPropertyOptional(UsuarioCreateCommandFields.matricula.swaggerMetadata)
  matricula?: string | null;

  @ApiPropertyOptional(UsuarioCreateCommandFields.email.swaggerMetadata)
  email?: string | null;
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
