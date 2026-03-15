import { Mixin } from "ts-mixer";
import {
  EntityBaseRestDto,
  PaginatedFilterByIdRestDto,
  PaginationMetaRestDto,
} from "@/modules/@shared/infrastructure/presentation/rest/dtos";
import {
  ApiProperty,
  ApiPropertyOptional,
  ApiSchema,
  commonProperties,
  PartialType,
  RegisterModel,
  referenceProperty,
  simpleProperty,
} from "@/modules/@shared/presentation/rest";
import {
  IsBoolean,
  IsOptional,
  IsString,
  IsUUID,
  Type,
  ValidateNested,
} from "@/modules/@shared/presentation/shared";
import { UsuarioFieldsMixin } from "@/modules/acesso/usuario/presentation.validations/usuario.validation-mixin";
import { ImagemFindOneOutputRestDto } from "@/modules/ambientes/bloco/presentation.rest";

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "UsuarioFindOneOutputDto" })
@RegisterModel({
  name: "UsuarioFindOneOutputDto",
  properties: [
    simpleProperty("id"),
    simpleProperty("nome", { nullable: true }),
    simpleProperty("matricula", { nullable: true }),
    simpleProperty("email", { nullable: true }),
    simpleProperty("isSuperUser"),
    referenceProperty("imagemCapa", "ImagemFindOneOutputDto", { nullable: true }),
    referenceProperty("imagemPerfil", "ImagemFindOneOutputDto", { nullable: true }),
    ...commonProperties.dated,
  ],
})
export class UsuarioFindOneOutputRestDto extends Mixin(EntityBaseRestDto, UsuarioFieldsMixin) {
  @ApiPropertyOptional({
    type: "string",
    description: "Nome do usuario",
    nullable: true,
    minLength: 1,
  })
  declare nome: string | null;

  @ApiPropertyOptional({
    type: "string",
    description: "Matrícula do usuário",
    nullable: true,
    minLength: 1,
  })
  declare matricula: string | null;

  @ApiPropertyOptional({
    type: "string",
    description: "E-mail do usuario",
    nullable: true,
    format: "email",
  })
  declare email: string | null;

  @ApiProperty({ type: "boolean", description: "Diz que o usuario tem poderes de administrador" })
  @IsBoolean()
  isSuperUser: boolean;

  @ApiPropertyOptional({
    type: () => ImagemFindOneOutputRestDto,
    description: "Imagem de capa do usuario",
    nullable: true,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ImagemFindOneOutputRestDto)
  imagemCapa: ImagemFindOneOutputRestDto | null;

  @ApiPropertyOptional({
    type: () => ImagemFindOneOutputRestDto,
    description: "Imagem de perfil do usuario",
    nullable: true,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ImagemFindOneOutputRestDto)
  imagemPerfil: ImagemFindOneOutputRestDto | null;
}

// ============================================================================
// Ensino Output (dados de ensino do usuario)
// ============================================================================

@ApiSchema({ name: "UsuarioEnsinoTurmaRefDto" })
export class UsuarioEnsinoTurmaRefRestDto {
  @ApiProperty({ type: "string", description: "ID da turma", format: "uuid" })
  @IsUUID()
  id: string;

  @ApiProperty({ type: "string", description: "Periodo da turma" })
  @IsString()
  periodo: string;
}

@ApiSchema({ name: "UsuarioEnsinoCursoRefDto" })
export class UsuarioEnsinoCursoRefRestDto {
  @ApiProperty({ type: "string", description: "ID do curso", format: "uuid" })
  @IsUUID()
  id: string;

  @ApiProperty({ type: "string", description: "Nome do curso" })
  @IsString()
  nome: string;

  @ApiProperty({
    description: "Turmas do curso onde o usuario leciona",
    type: () => [UsuarioEnsinoTurmaRefRestDto],
  })
  @ValidateNested({ each: true })
  @Type(() => UsuarioEnsinoTurmaRefRestDto)
  turmas: UsuarioEnsinoTurmaRefRestDto[];
}

@ApiSchema({ name: "UsuarioEnsinoDisciplinaRefDto" })
export class UsuarioEnsinoDisciplinaRefRestDto {
  @ApiProperty({ type: "string", description: "ID da disciplina", format: "uuid" })
  @IsUUID()
  id: string;

  @ApiProperty({ type: "string", description: "Nome da disciplina" })
  @IsString()
  nome: string;

  @ApiProperty({
    description: "Cursos onde o usuario leciona esta disciplina",
    type: () => [UsuarioEnsinoCursoRefRestDto],
  })
  @ValidateNested({ each: true })
  @Type(() => UsuarioEnsinoCursoRefRestDto)
  cursos: UsuarioEnsinoCursoRefRestDto[];
}

@ApiSchema({ name: "UsuarioEnsinoOutputDto" })
export class UsuarioEnsinoOutputRestDto {
  @ApiProperty({ description: "Dados do usuario", type: () => UsuarioFindOneOutputRestDto })
  @ValidateNested()
  @Type(() => UsuarioFindOneOutputRestDto)
  usuario: UsuarioFindOneOutputRestDto;

  @ApiProperty({
    description: "Disciplinas onde o usuario leciona (com cursos e turmas)",
    type: () => [UsuarioEnsinoDisciplinaRefRestDto],
  })
  @ValidateNested({ each: true })
  @Type(() => UsuarioEnsinoDisciplinaRefRestDto)
  disciplinas: UsuarioEnsinoDisciplinaRefRestDto[];
}

// ============================================================================
// List Input/Output
// ============================================================================

@ApiSchema({ name: "UsuarioListInputDto" })
export class UsuarioListInputRestDto extends PaginatedFilterByIdRestDto {}

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
export class UsuarioCreateInputRestDto extends UsuarioFieldsMixin {
  @ApiPropertyOptional({
    type: "string",
    description: "Nome do usuario",
    nullable: true,
    minLength: 1,
  })
  declare nome?: string | null;

  @ApiPropertyOptional({
    type: "string",
    description: "Matrícula do usuário",
    nullable: true,
    minLength: 1,
  })
  declare matricula?: string | null;

  @ApiPropertyOptional({
    type: "string",
    description: "E-mail do usuario",
    nullable: true,
    format: "email",
  })
  declare email?: string | null;
}

@ApiSchema({ name: "UsuarioUpdateInputDto" })
export class UsuarioUpdateInputRestDto extends PartialType(UsuarioCreateInputRestDto) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "UsuarioFindOneInputDto" })
export class UsuarioFindOneInputRestDto {
  @ApiProperty({
    type: "string",
    description: "Identificador do registro (uuid)",
    format: "uuid",
  })
  @IsUUID()
  id: string;
}
