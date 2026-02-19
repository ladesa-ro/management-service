import { ApiProperty, ApiPropertyOptional, ApiSchema, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";
import { decorate, Mixin } from "ts-mixer";
import {
  commonProperties,
  RegisterModel,
  referenceProperty,
  simpleProperty,
} from "@/modules/@shared/infrastructure/persistence/typeorm/metadata";
import {
  EntityBaseRestDto,
  PaginatedFilterByIdRestDto,
  PaginationMetaRestDto,
} from "@/modules/@shared/infrastructure/presentation/rest/dtos";
import { UsuarioFieldsMixin } from "@/modules/acesso/usuario/presentation/usuario.validation-mixin";
import { ImagemFindOneOutputRestDto } from "@/modules/ambientes/bloco/presentation/rest";

// ============================================================================
// FindOne Output
// ============================================================================

@decorate(ApiSchema({ name: "UsuarioFindOneOutputDto" }))
@decorate(
  RegisterModel({
    name: "UsuarioFindOneOutputDto",
    properties: [
      simpleProperty("id"),
      simpleProperty("nome", { nullable: true }),
      simpleProperty("matriculaSiape", { nullable: true }),
      simpleProperty("email", { nullable: true }),
      simpleProperty("isSuperUser"),
      referenceProperty("imagemCapa", "ImagemFindOneOutputDto", { nullable: true }),
      referenceProperty("imagemPerfil", "ImagemFindOneOutputDto", { nullable: true }),
      ...commonProperties.dated,
    ],
  }),
)
export class UsuarioFindOneOutputRestDto extends Mixin(EntityBaseRestDto, UsuarioFieldsMixin) {
  @decorate(
    ApiPropertyOptional({
      type: "string",
      description: "Nome do usuario",
      nullable: true,
      minLength: 1,
    }),
  )
  declare nome: string | null;

  @decorate(
    ApiPropertyOptional({
      type: "string",
      description: "Matricula SIAPE do usuario",
      nullable: true,
      minLength: 1,
    }),
  )
  declare matriculaSiape: string | null;

  @decorate(
    ApiPropertyOptional({
      type: "string",
      description: "E-mail do usuario",
      nullable: true,
      format: "email",
    }),
  )
  declare email: string | null;

  @decorate(
    ApiProperty({ type: "boolean", description: "Diz que o usuario tem poderes de administrador" }),
  )
  @decorate(IsBoolean())
  isSuperUser: boolean;

  @decorate(
    ApiPropertyOptional({
      type: () => ImagemFindOneOutputRestDto,
      description: "Imagem de capa do usuario",
      nullable: true,
    }),
  )
  @decorate(IsOptional())
  @decorate(ValidateNested())
  @decorate(Type(() => ImagemFindOneOutputRestDto))
  imagemCapa: ImagemFindOneOutputRestDto | null;

  @decorate(
    ApiPropertyOptional({
      type: () => ImagemFindOneOutputRestDto,
      description: "Imagem de perfil do usuario",
      nullable: true,
    }),
  )
  @decorate(IsOptional())
  @decorate(ValidateNested())
  @decorate(Type(() => ImagemFindOneOutputRestDto))
  imagemPerfil: ImagemFindOneOutputRestDto | null;
}

// ============================================================================
// Ensino Output (dados de ensino do usuario)
// ============================================================================

@decorate(ApiSchema({ name: "UsuarioEnsinoTurmaRefDto" }))
export class UsuarioEnsinoTurmaRefRestDto {
  @decorate(ApiProperty({ type: "string", description: "ID da turma", format: "uuid" }))
  @decorate(IsUUID())
  id: string;

  @decorate(ApiProperty({ type: "string", description: "Periodo da turma" }))
  @decorate(IsString())
  periodo: string;
}

@decorate(ApiSchema({ name: "UsuarioEnsinoCursoRefDto" }))
export class UsuarioEnsinoCursoRefRestDto {
  @decorate(ApiProperty({ type: "string", description: "ID do curso", format: "uuid" }))
  @decorate(IsUUID())
  id: string;

  @decorate(ApiProperty({ type: "string", description: "Nome do curso" }))
  @decorate(IsString())
  nome: string;

  @decorate(
    ApiProperty({
      description: "Turmas do curso onde o usuario leciona",
      type: () => [UsuarioEnsinoTurmaRefRestDto],
    }),
  )
  @decorate(ValidateNested({ each: true }))
  @decorate(Type(() => UsuarioEnsinoTurmaRefRestDto))
  turmas: UsuarioEnsinoTurmaRefRestDto[];
}

@decorate(ApiSchema({ name: "UsuarioEnsinoDisciplinaRefDto" }))
export class UsuarioEnsinoDisciplinaRefRestDto {
  @decorate(ApiProperty({ type: "string", description: "ID da disciplina", format: "uuid" }))
  @decorate(IsUUID())
  id: string;

  @decorate(ApiProperty({ type: "string", description: "Nome da disciplina" }))
  @decorate(IsString())
  nome: string;

  @decorate(
    ApiProperty({
      description: "Cursos onde o usuario leciona esta disciplina",
      type: () => [UsuarioEnsinoCursoRefRestDto],
    }),
  )
  @decorate(ValidateNested({ each: true }))
  @decorate(Type(() => UsuarioEnsinoCursoRefRestDto))
  cursos: UsuarioEnsinoCursoRefRestDto[];
}

@decorate(ApiSchema({ name: "UsuarioEnsinoOutputDto" }))
export class UsuarioEnsinoOutputRestDto {
  @decorate(
    ApiProperty({ description: "Dados do usuario", type: () => UsuarioFindOneOutputRestDto }),
  )
  @decorate(ValidateNested())
  @decorate(Type(() => UsuarioFindOneOutputRestDto))
  usuario: UsuarioFindOneOutputRestDto;

  @decorate(
    ApiProperty({
      description: "Disciplinas onde o usuario leciona (com cursos e turmas)",
      type: () => [UsuarioEnsinoDisciplinaRefRestDto],
    }),
  )
  @decorate(ValidateNested({ each: true }))
  @decorate(Type(() => UsuarioEnsinoDisciplinaRefRestDto))
  disciplinas: UsuarioEnsinoDisciplinaRefRestDto[];
}

// ============================================================================
// List Input/Output
// ============================================================================

@decorate(ApiSchema({ name: "UsuarioListInputDto" }))
export class UsuarioListInputRestDto extends PaginatedFilterByIdRestDto {}

@decorate(ApiSchema({ name: "UsuarioListOutputDto" }))
export class UsuarioListOutputRestDto {
  @decorate(ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" }))
  meta: PaginationMetaRestDto;

  @decorate(
    ApiProperty({ type: () => [UsuarioFindOneOutputRestDto], description: "Resultados da busca" }),
  )
  data: UsuarioFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@decorate(ApiSchema({ name: "UsuarioCreateInputDto" }))
export class UsuarioCreateInputRestDto extends UsuarioFieldsMixin {
  @decorate(
    ApiPropertyOptional({
      type: "string",
      description: "Nome do usuario",
      nullable: true,
      minLength: 1,
    }),
  )
  declare nome?: string | null;

  @decorate(
    ApiPropertyOptional({
      type: "string",
      description: "Matricula SIAPE do usuario",
      nullable: true,
      minLength: 1,
    }),
  )
  declare matriculaSiape?: string | null;

  @decorate(
    ApiPropertyOptional({
      type: "string",
      description: "E-mail do usuario",
      nullable: true,
      format: "email",
    }),
  )
  declare email?: string | null;
}

@decorate(ApiSchema({ name: "UsuarioUpdateInputDto" }))
export class UsuarioUpdateInputRestDto extends PartialType(UsuarioCreateInputRestDto) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@decorate(ApiSchema({ name: "UsuarioFindOneInputDto" }))
export class UsuarioFindOneInputRestDto {
  @decorate(
    ApiProperty({
      type: "string",
      description: "Identificador do registro (uuid)",
      format: "uuid",
    }),
  )
  @decorate(IsUUID())
  id: string;
}
