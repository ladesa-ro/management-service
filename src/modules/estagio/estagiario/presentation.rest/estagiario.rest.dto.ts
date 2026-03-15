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
  simpleProperty,
  TransformToArray,
} from "@/modules/@shared/presentation/rest";
import {
  IsArray,
  IsOptional,
  IsUUID,
} from "@/modules/@shared/presentation/shared";
import { EstagiarioFieldsMixin } from "../presentation.validations/estagiario.validation-mixin";

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "EstagiarioFindOneOutputDto" })
@RegisterModel({
  name: "EstagiarioFindOneOutputDto",
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
export class EstagiarioFindOneOutputRestDto extends Mixin(
  EntityBaseRestDto,
  EstagiarioFieldsMixin,
) {
  @ApiProperty({
    type: "string",
    format: "uuid",
    description: "ID do perfil vinculado ao estagiário",
  })
  declare idPerfilFk: string;

  @ApiProperty({
    type: "string",
    format: "uuid",
    description: "ID do curso vinculado ao estagiário",
  })
  declare idCursoFk: string;

  @ApiProperty({
    type: "string",
    format: "uuid",
    description: "ID da turma vinculada ao estagiário",
  })
  declare idTurmaFk: string;

  @ApiProperty({
    type: "string",
    description: "Telefone do estagiário",
    minLength: 1,
    maxLength: 15,
  })
  declare telefone: string;

  @ApiPropertyOptional({
    type: "string",
    format: "email",
    nullable: true,
    description: "Email institucional do estagiário",
  })
  emailInstitucional: string | null;

  @ApiProperty({ type: "string", format: "date", description: "Data de nascimento do estagiário" })
  declare dataNascimento: string;

  @ApiProperty({ type: "boolean", description: "Se o estagiário está ativo" })
  ativo: boolean;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ApiSchema({ name: "EstagiarioListInputDto" })
export class EstagiarioListInputRestDto extends PaginatedFilterByIdRestDto {
  @ApiPropertyOptional({
    type: "string",
    format: "uuid",
    description: "Filtro por ID de perfil",
    isArray: true,
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  "filter.idPerfilFk"?: string[];

  @ApiPropertyOptional({
    type: "string",
    format: "uuid",
    description: "Filtro por ID de curso",
    isArray: true,
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  "filter.idCursoFk"?: string[];

  @ApiPropertyOptional({
    type: "string",
    format: "uuid",
    description: "Filtro por ID de turma",
    isArray: true,
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
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
export class EstagiarioCreateInputRestDto extends EstagiarioFieldsMixin {
  @ApiProperty({
    type: "string",
    format: "uuid",
    description: "ID do perfil vinculado ao estagiário",
  })
  declare idPerfilFk: string;

  @ApiProperty({
    type: "string",
    format: "uuid",
    description: "ID do curso vinculado ao estagiário",
  })
  declare idCursoFk: string;

  @ApiProperty({
    type: "string",
    format: "uuid",
    description: "ID da turma vinculada ao estagiário",
  })
  declare idTurmaFk: string;

  @ApiProperty({
    type: "string",
    description: "Telefone do estagiário",
    minLength: 1,
    maxLength: 15,
  })
  declare telefone: string;

  @ApiProperty({
    type: "string",
    format: "email",
    description: "Email institucional do estagiário",
  })
  declare emailInstitucional: string;

  @ApiProperty({ type: "string", format: "date", description: "Data de nascimento do estagiário" })
  declare dataNascimento: string;
}

@ApiSchema({ name: "EstagiarioUpdateInputDto" })
export class EstagiarioUpdateInputRestDto extends PartialType(EstagiarioCreateInputRestDto) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "EstagiarioFindOneInputDto" })
export class EstagiarioFindOneInputRestDto {
  @ApiProperty({
    type: "string",
    description: "Identificador do registro (uuid)",
    format: "uuid",
  })
  @IsUUID()
  id: string;
}
