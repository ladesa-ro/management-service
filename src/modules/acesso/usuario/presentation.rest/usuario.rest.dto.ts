import {
  usuarioCreateSchema,
  usuarioFindOneInputSchema,
  usuarioPaginationInputSchema,
  usuarioUpdateSchema,
} from "@/modules/acesso/usuario/domain/usuario.schemas";
import { ImagemFindOneOutputRestDto } from "@/modules/ambientes/bloco/presentation.rest";
import {
  ApiProperty,
  ApiPropertyOptional,
  ApiSchema,
  commonProperties,
  RegisterModel,
  referenceProperty,
  simpleProperty,
} from "@/shared/presentation/rest";
import {
  EntityBaseRestDto,
  PaginatedFilterByIdRestDto,
  PaginationMetaRestDto,
} from "@/shared/presentation/rest/dtos";

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "UsuarioFindOneOutputDto" })
@RegisterModel({
  name: "UsuarioFindOneQueryResult",
  properties: [
    simpleProperty("id"),
    simpleProperty("nome", { nullable: true }),
    simpleProperty("matricula", { nullable: true }),
    simpleProperty("email", { nullable: true }),
    simpleProperty("isSuperUser"),
    referenceProperty("imagemCapa", "ImagemFindOneQueryResult", { nullable: true }),
    referenceProperty("imagemPerfil", "ImagemFindOneQueryResult", { nullable: true }),
    ...commonProperties.dated,
  ],
})
export class UsuarioFindOneOutputRestDto extends EntityBaseRestDto {
  @ApiPropertyOptional({
    type: "string",
    description: "Nome do usuario",
    nullable: true,
    minLength: 1,
  })
  nome: string | null;

  @ApiPropertyOptional({
    type: "string",
    description: "Matrícula do usuário",
    nullable: true,
    minLength: 1,
  })
  matricula: string | null;

  @ApiPropertyOptional({
    type: "string",
    description: "E-mail do usuario",
    nullable: true,
    format: "email",
  })
  email: string | null;

  @ApiProperty({ type: "boolean", description: "Diz que o usuario tem poderes de administrador" })
  isSuperUser: boolean;

  @ApiPropertyOptional({
    type: () => ImagemFindOneOutputRestDto,
    description: "Imagem de capa do usuario",
    nullable: true,
  })
  imagemCapa: ImagemFindOneOutputRestDto | null;

  @ApiPropertyOptional({
    type: () => ImagemFindOneOutputRestDto,
    description: "Imagem de perfil do usuario",
    nullable: true,
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
  static schema = usuarioPaginationInputSchema;

  @ApiPropertyOptional({
    type: "string",
    description: "Filtro por cargo do vinculo (ex: professor)",
  })
  "filter.vinculos.cargo"?: string;
}

@ApiSchema({ name: "UsuarioListOutputDto" })
export class UsuarioListOutputRestDto {
  @ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" })
  meta: PaginationMetaRestDto;

  @ApiProperty({ type: () => [UsuarioFindOneOutputRestDto], description: "Resultados da busca" })
  data: UsuarioFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@ApiSchema({ name: "UsuarioCreateInputDto" })
export class UsuarioCreateInputRestDto {
  static schema = usuarioCreateSchema;

  @ApiPropertyOptional({
    type: "string",
    description: "Nome do usuario",
    nullable: true,
    minLength: 1,
  })
  nome?: string | null;

  @ApiPropertyOptional({
    type: "string",
    description: "Matrícula do usuário",
    nullable: true,
    minLength: 1,
  })
  matricula?: string | null;

  @ApiPropertyOptional({
    type: "string",
    description: "E-mail do usuario",
    nullable: true,
    format: "email",
  })
  email?: string | null;
}

@ApiSchema({ name: "UsuarioUpdateInputDto" })
export class UsuarioUpdateInputRestDto {
  static schema = usuarioUpdateSchema;

  @ApiPropertyOptional({
    type: "string",
    description: "Nome do usuario",
    nullable: true,
    minLength: 1,
  })
  nome?: string | null;

  @ApiPropertyOptional({
    type: "string",
    description: "Matrícula do usuário",
    nullable: true,
    minLength: 1,
  })
  matricula?: string | null;

  @ApiPropertyOptional({
    type: "string",
    description: "E-mail do usuario",
    nullable: true,
    format: "email",
  })
  email?: string | null;
}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "UsuarioFindOneInputDto" })
export class UsuarioFindOneInputRestDto {
  static schema = usuarioFindOneInputSchema;

  @ApiProperty({
    type: "string",
    description: "Identificador do registro (uuid)",
    format: "uuid",
  })
  id: string;
}
