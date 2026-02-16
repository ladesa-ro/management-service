import { ApiProperty, ApiPropertyOptional, ApiSchema } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";
import { decorate } from "ts-mixer";
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
  CampusFindOneInputRestDto,
  CampusFindOneOutputRestDto,
} from "@/server/nest/modules/campus/rest";
import {
  UsuarioFindOneInputRestDto,
  UsuarioFindOneOutputRestDto,
} from "@/server/nest/modules/usuario/rest";

// ============================================================================
// FindOne Output
// ============================================================================

@decorate(ApiSchema({ name: "PerfilFindOneOutputDto" }))
@decorate(
  RegisterModel({
    name: "PerfilFindOneOutputDto",
    properties: [
      simpleProperty("id"),
      simpleProperty("ativo"),
      simpleProperty("cargo"),
      referenceProperty("campus", "CampusFindOneOutputDto"),
      referenceProperty("usuario", "UsuarioFindOneOutputDto"),
      ...commonProperties.dated,
    ],
  }),
)
export class PerfilFindOneOutputRestDto extends EntityBaseRestDto {
  @decorate(ApiProperty({ type: "boolean", description: "Indica se o vinculo esta ativo" }))
  @decorate(IsBoolean())
  ativo: boolean;

  @decorate(ApiProperty({ type: "string", description: "Cargo do usuario no vinculo" }))
  @decorate(IsString())
  cargo: string;

  @decorate(
    ApiProperty({
      type: () => CampusFindOneOutputRestDto,
      description: "Campus associado ao vinculo",
    }),
  )
  @decorate(ValidateNested())
  @decorate(Type(() => CampusFindOneOutputRestDto))
  campus: CampusFindOneOutputRestDto;

  @decorate(
    ApiProperty({
      type: () => UsuarioFindOneOutputRestDto,
      description: "Usuario associado ao vinculo",
    }),
  )
  @decorate(ValidateNested())
  @decorate(Type(() => UsuarioFindOneOutputRestDto))
  usuario: UsuarioFindOneOutputRestDto;
}

// ============================================================================
// List Input/Output
// ============================================================================

@decorate(ApiSchema({ name: "PerfilListInputDto" }))
export class PerfilListInputRestDto extends PaginatedFilterByIdRestDto {
  @decorate(
    ApiPropertyOptional({
      type: "string",
      isArray: true,
      description: "Filtro por ativo",
    }),
  )
  @decorate(TransformToArray())
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsString({ each: true }))
  "filter.ativo"?: string[];

  @decorate(
    ApiPropertyOptional({
      type: "string",
      isArray: true,
      description: "Filtro por cargo",
    }),
  )
  @decorate(TransformToArray())
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsString({ each: true }))
  "filter.cargo"?: string[];

  @decorate(
    ApiPropertyOptional({
      type: "string",
      isArray: true,
      description: "Filtro por ID do Campus",
    }),
  )
  @decorate(TransformToArray())
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsUUID(undefined, { each: true }))
  "filter.campus.id"?: string[];

  @decorate(
    ApiPropertyOptional({
      type: "string",
      isArray: true,
      description: "Filtro por ID do Usuario",
    }),
  )
  @decorate(TransformToArray())
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsUUID(undefined, { each: true }))
  "filter.usuario.id"?: string[];
}

@decorate(ApiSchema({ name: "PerfilListOutputDto" }))
export class PerfilListOutputRestDto {
  @decorate(ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" }))
  meta: PaginationMetaRestDto;

  @decorate(
    ApiProperty({ type: () => [PerfilFindOneOutputRestDto], description: "Resultados da busca" }),
  )
  data: PerfilFindOneOutputRestDto[];
}

// ============================================================================
// SetVinculos Input
// ============================================================================

@decorate(ApiSchema({ name: "PerfilSetVinculosInputDto" }))
export class PerfilSetVinculosInputRestDto {
  @decorate(
    ApiProperty({
      type: "string",
      isArray: true,
      description: "Lista de cargos que o usuario tera no campus",
      example: ["professor", "coordenador"],
    }),
  )
  @decorate(IsArray())
  @decorate(IsString({ each: true }))
  cargos: string[];

  @decorate(
    ApiProperty({
      type: () => CampusFindOneInputRestDto,
      description: "Campus onde os vinculos serao definidos",
    }),
  )
  @decorate(ValidateNested())
  @decorate(Type(() => CampusFindOneInputRestDto))
  campus: CampusFindOneInputRestDto;

  @decorate(
    ApiProperty({
      type: () => UsuarioFindOneInputRestDto,
      description: "Usuario que recebera os vinculos",
    }),
  )
  @decorate(ValidateNested())
  @decorate(Type(() => UsuarioFindOneInputRestDto))
  usuario: UsuarioFindOneInputRestDto;
}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@decorate(ApiSchema({ name: "PerfilFindOneInputDto" }))
export class PerfilFindOneInputRestDto {
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
