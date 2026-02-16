import { ApiProperty, ApiPropertyOptional, ApiSchema } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsInt, IsOptional, IsString, ValidateNested } from "class-validator";
import { decorate } from "ts-mixer";
import { EstadoFindOneOutputRestDto } from "@/modules/@base/localidades/estado/presentation/rest/estado.rest.dto";
import {
  RegisterModel,
  referenceProperty,
  simpleProperty,
} from "@/modules/@shared/infrastructure/persistence/typeorm/metadata";
import {
  PaginatedFilterByStringIdRestDto,
  PaginationMetaRestDto,
  TransformToArray,
} from "@/modules/@shared/infrastructure/presentation/rest/dtos";

// ============================================================================
// FindOne Output
// ============================================================================

@decorate(ApiSchema({ name: "CidadeFindOneOutputDto" }))
@decorate(
  RegisterModel({
    name: "CidadeFindOneOutputDto",
    properties: [
      simpleProperty("id"),
      simpleProperty("nome"),
      referenceProperty("estado", "EstadoFindOneOutputDto"),
    ],
  }),
)
export class CidadeFindOneOutputRestDto {
  @decorate(ApiProperty({ type: "integer", description: "Identificador do registro (numerico)" }))
  @decorate(IsInt())
  id: number;

  @decorate(ApiProperty({ type: "string", description: "Nome oficial da cidade" }))
  @decorate(IsString())
  nome: string;

  @decorate(
    ApiProperty({ type: () => EstadoFindOneOutputRestDto, description: "Estado da cidade" }),
  )
  @decorate(ValidateNested())
  @decorate(Type(() => EstadoFindOneOutputRestDto))
  estado: EstadoFindOneOutputRestDto;
}

// ============================================================================
// List Input/Output
// ============================================================================

@decorate(ApiSchema({ name: "CidadeListInputDto" }))
export class CidadeListInputRestDto extends PaginatedFilterByStringIdRestDto {
  @decorate(
    ApiPropertyOptional({
      description: "Filtro por ID do Estado",
      type: "string",
      isArray: true,
    }),
  )
  @decorate(TransformToArray())
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsString({ each: true }))
  "filter.estado.id"?: string[];

  @decorate(
    ApiPropertyOptional({
      description: "Filtro por nome do Estado",
      type: "string",
      isArray: true,
    }),
  )
  @decorate(TransformToArray())
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsString({ each: true }))
  "filter.estado.nome"?: string[];

  @decorate(
    ApiPropertyOptional({
      description: "Filtro por sigla do Estado",
      type: "string",
      isArray: true,
    }),
  )
  @decorate(TransformToArray())
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsString({ each: true }))
  "filter.estado.sigla"?: string[];
}

@decorate(ApiSchema({ name: "CidadeListOutputDto" }))
export class CidadeListOutputRestDto {
  @decorate(ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" }))
  meta: PaginationMetaRestDto;

  @decorate(
    ApiProperty({ type: () => [CidadeFindOneOutputRestDto], description: "Resultados da busca" }),
  )
  data: CidadeFindOneOutputRestDto[];
}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@decorate(ApiSchema({ name: "CidadeFindOneInputDto" }))
export class CidadeFindOneInputRestDto {
  @decorate(ApiProperty({ type: "integer", description: "Identificador do registro (numerico)" }))
  @decorate(Type(() => Number))
  @decorate(IsInt())
  id: number;
}
