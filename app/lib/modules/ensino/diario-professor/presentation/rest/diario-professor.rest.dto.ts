import { ApiProperty, ApiPropertyOptional, ApiSchema, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsOptional, IsUUID, ValidateNested } from "class-validator";
import { decorate, Mixin } from "ts-mixer";
import {
  PerfilFindOneInputRestDto,
  PerfilFindOneOutputRestDto,
} from "@/modules/@acesso/perfil/presentation/rest";
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
  TransformToArray,
} from "@/modules/@shared/infrastructure/presentation/rest/dtos";
import {
  DiarioFindOneInputRestDto,
  DiarioFindOneOutputRestDto,
} from "@/modules/ensino/diario/presentation/rest";
import { DiarioProfessorFieldsMixin } from "../diario-professor.validation-mixin";

// ============================================================================
// FindOne Output
// ============================================================================

@decorate(ApiSchema({ name: "DiarioProfessorFindOneOutputDto" }))
@decorate(
  RegisterModel({
    name: "DiarioProfessorFindOneOutputDto",
    properties: [
      simpleProperty("id"),
      simpleProperty("situacao"),
      referenceProperty("perfil", "PerfilFindOneOutputDto"),
      referenceProperty("diario", "DiarioFindOneOutputDto"),
      ...commonProperties.dated,
    ],
  }),
)
export class DiarioProfessorFindOneOutputRestDto extends Mixin(
  EntityBaseRestDto,
  DiarioProfessorFieldsMixin,
) {
  @decorate(ApiProperty({ type: "boolean", description: "Situacao do vinculo" }))
  declare situacao: boolean;

  @decorate(
    ApiProperty({
      type: () => PerfilFindOneOutputRestDto,
      description: "Perfil do usuario ao campus",
    }),
  )
  @decorate(ValidateNested())
  @decorate(Type(() => PerfilFindOneOutputRestDto))
  perfil: PerfilFindOneOutputRestDto;

  @decorate(
    ApiProperty({ type: () => DiarioFindOneOutputRestDto, description: "Diario vinculado" }),
  )
  @decorate(ValidateNested())
  @decorate(Type(() => DiarioFindOneOutputRestDto))
  diario: DiarioFindOneOutputRestDto;
}

// ============================================================================
// List Input/Output
// ============================================================================

@decorate(ApiSchema({ name: "DiarioProfessorListInputDto" }))
export class DiarioProfessorListInputRestDto extends PaginatedFilterByIdRestDto {
  @decorate(
    ApiPropertyOptional({
      type: "string",
      isArray: true,
      description: "Filtro por ID do Usuario do Perfil",
    }),
  )
  @decorate(TransformToArray())
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsUUID(undefined, { each: true }))
  "filter.perfil.usuario.id"?: string[];

  @decorate(
    ApiPropertyOptional({
      type: "string",
      isArray: true,
      description: "Filtro por ID do Perfil",
    }),
  )
  @decorate(TransformToArray())
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsUUID(undefined, { each: true }))
  "filter.perfil.id"?: string[];

  @decorate(
    ApiPropertyOptional({
      type: "string",
      isArray: true,
      description: "Filtro por ID do Diario",
    }),
  )
  @decorate(TransformToArray())
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsUUID(undefined, { each: true }))
  "filter.diario.id"?: string[];
}

@decorate(ApiSchema({ name: "DiarioProfessorListOutputDto" }))
export class DiarioProfessorListOutputRestDto {
  @decorate(ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" }))
  meta: PaginationMetaRestDto;

  @decorate(
    ApiProperty({
      type: () => [DiarioProfessorFindOneOutputRestDto],
      description: "Resultados da busca",
    }),
  )
  data: DiarioProfessorFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@decorate(ApiSchema({ name: "DiarioProfessorCreateInputDto" }))
export class DiarioProfessorCreateInputRestDto extends DiarioProfessorFieldsMixin {
  @decorate(ApiProperty({ type: "boolean", description: "Situacao do vinculo" }))
  declare situacao: boolean;

  @decorate(
    ApiProperty({
      type: () => PerfilFindOneInputRestDto,
      description: "Perfil do usuario ao campus",
    }),
  )
  @decorate(ValidateNested())
  @decorate(Type(() => PerfilFindOneInputRestDto))
  perfil: PerfilFindOneInputRestDto;

  @decorate(ApiProperty({ type: () => DiarioFindOneInputRestDto, description: "Diario vinculado" }))
  @decorate(ValidateNested())
  @decorate(Type(() => DiarioFindOneInputRestDto))
  diario: DiarioFindOneInputRestDto;
}

@decorate(ApiSchema({ name: "DiarioProfessorUpdateInputDto" }))
export class DiarioProfessorUpdateInputRestDto extends PartialType(
  DiarioProfessorCreateInputRestDto,
) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@decorate(ApiSchema({ name: "DiarioProfessorFindOneInputDto" }))
export class DiarioProfessorFindOneInputRestDto {
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
