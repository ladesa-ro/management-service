import {
  estagiarioCreateSchema,
  estagiarioFindOneInputSchema,
  estagiarioPaginationInputSchema,
  estagiarioUpdateSchema,
} from "@/modules/estagio/estagiario/domain/estagiario.schemas";
import {
  ApiProperty,
  ApiPropertyOptional,
  ApiSchema,
  commonProperties,
  RegisterModel,
  simpleProperty,
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
@RegisterModel({
  name: "EstagiarioFindOneQueryResult",
  properties: [
    simpleProperty("id"),
    simpleProperty("idPerfilFk"),
    simpleProperty("idCursoFk"),
    simpleProperty("idTurmaFk"),
    simpleProperty("telefone"),
    simpleProperty("emailInstitucional"),
    simpleProperty("dataNascimento"),
    simpleProperty("ativo"),
    ...commonProperties.dated,
  ],
})
export class EstagiarioFindOneOutputRestDto extends EntityBaseRestDto {
  @ApiProperty({
    type: "string",
    format: "uuid",
    description: "ID do perfil vinculado ao estagiário",
  })
  idPerfilFk: string;

  @ApiProperty({
    type: "string",
    format: "uuid",
    description: "ID do curso vinculado ao estagiário",
  })
  idCursoFk: string;

  @ApiProperty({
    type: "string",
    format: "uuid",
    description: "ID da turma vinculada ao estagiário",
  })
  idTurmaFk: string;

  @ApiProperty({
    type: "string",
    description: "Telefone do estagiário",
    minLength: 1,
    maxLength: 15,
  })
  telefone: string;

  @ApiPropertyOptional({
    type: "string",
    format: "email",
    nullable: true,
    description: "Email institucional do estagiário",
  })
  emailInstitucional: string | null = null;

  @ApiProperty({ type: "string", format: "date", description: "Data de nascimento do estagiário" })
  dataNascimento: string;

  @ApiProperty({ type: "boolean", description: "Se o estagiário está ativo" })
  ativo: boolean;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ApiSchema({ name: "EstagiarioListInputDto" })
export class EstagiarioListInputRestDto extends PaginatedFilterByIdRestDto {
  static schema = estagiarioPaginationInputSchema;

  @ApiPropertyOptional({
    type: "string",
    format: "uuid",
    description: "Filtro por ID de perfil",
    isArray: true,
  })
  @TransformToArray()
  "filter.idPerfilFk"?: string[];

  @ApiPropertyOptional({
    type: "string",
    format: "uuid",
    description: "Filtro por ID de curso",
    isArray: true,
  })
  @TransformToArray()
  "filter.idCursoFk"?: string[];

  @ApiPropertyOptional({
    type: "string",
    format: "uuid",
    description: "Filtro por ID de turma",
    isArray: true,
  })
  @TransformToArray()
  "filter.idTurmaFk"?: string[];
}

@ApiSchema({ name: "EstagiarioListOutputDto" })
export class EstagiarioListOutputRestDto {
  @ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" })
  meta: PaginationMetaRestDto;

  @ApiProperty({ type: () => [EstagiarioFindOneOutputRestDto], description: "Resultados da busca" })
  data: EstagiarioFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@ApiSchema({ name: "EstagiarioCreateInputDto" })
export class EstagiarioCreateInputRestDto {
  static schema = estagiarioCreateSchema;

  @ApiProperty({
    type: "string",
    format: "uuid",
    description: "ID do perfil vinculado ao estagiário",
  })
  idPerfilFk: string;

  @ApiProperty({
    type: "string",
    format: "uuid",
    description: "ID do curso vinculado ao estagiário",
  })
  idCursoFk: string;

  @ApiProperty({
    type: "string",
    format: "uuid",
    description: "ID da turma vinculada ao estagiário",
  })
  idTurmaFk: string;

  @ApiProperty({
    type: "string",
    description: "Telefone do estagiário",
    minLength: 1,
    maxLength: 15,
  })
  telefone: string;

  @ApiProperty({
    type: "string",
    format: "email",
    description: "Email institucional do estagiário",
  })
  emailInstitucional: string;

  @ApiProperty({ type: "string", format: "date", description: "Data de nascimento do estagiário" })
  dataNascimento: string;
}

@ApiSchema({ name: "EstagiarioUpdateInputDto" })
export class EstagiarioUpdateInputRestDto {
  static schema = estagiarioUpdateSchema;

  @ApiPropertyOptional({
    type: "string",
    format: "uuid",
    description: "ID do perfil vinculado ao estagiário",
  })
  idPerfilFk?: string;

  @ApiPropertyOptional({
    type: "string",
    format: "uuid",
    description: "ID do curso vinculado ao estagiário",
  })
  idCursoFk?: string;

  @ApiPropertyOptional({
    type: "string",
    format: "uuid",
    description: "ID da turma vinculada ao estagiário",
  })
  idTurmaFk?: string;

  @ApiPropertyOptional({
    type: "string",
    description: "Telefone do estagiário",
    minLength: 1,
    maxLength: 15,
  })
  telefone?: string;

  @ApiPropertyOptional({
    type: "string",
    format: "email",
    description: "Email institucional do estagiário",
  })
  emailInstitucional?: string;

  @ApiPropertyOptional({
    type: "string",
    format: "date",
    description: "Data de nascimento do estagiário",
  })
  dataNascimento?: string;
}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "EstagiarioFindOneInputDto" })
export class EstagiarioFindOneInputRestDto {
  static schema = estagiarioFindOneInputSchema;

  @ApiProperty({
    type: "string",
    description: "Identificador do registro (uuid)",
    format: "uuid",
  })
  id: string;
}
