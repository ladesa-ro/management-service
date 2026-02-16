import { ApiProperty, ApiSchema } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsString } from "class-validator";
import { decorate } from "ts-mixer";
import {
  RegisterModel,
  simpleProperty,
} from "@/modules/@shared/infrastructure/persistence/typeorm/metadata";
import {
  PaginatedFilterByStringIdRestDto,
  PaginationMetaRestDto,
} from "@/modules/@shared/infrastructure/presentation/rest/dtos";

// ============================================================================
// FindOne Output
// ============================================================================

@decorate(ApiSchema({ name: "EstadoFindOneOutputDto" }))
@decorate(
  RegisterModel({
    name: "EstadoFindOneOutputDto",
    properties: [simpleProperty("id"), simpleProperty("nome"), simpleProperty("sigla")],
  }),
)
export class EstadoFindOneOutputRestDto {
  @decorate(ApiProperty({ type: "integer", description: "Identificador do registro (numerico)" }))
  @decorate(IsInt())
  id: number;

  @decorate(ApiProperty({ type: "string", description: "Nome oficial do estado" }))
  @decorate(IsString())
  nome: string;

  @decorate(ApiProperty({ type: "string", description: "Sigla do estado" }))
  @decorate(IsString())
  sigla: string;
}

// ============================================================================
// List Input/Output
// ============================================================================

@decorate(ApiSchema({ name: "EstadoListInputDto" }))
export class EstadoListInputRestDto extends PaginatedFilterByStringIdRestDto {}

@decorate(ApiSchema({ name: "EstadoListOutputDto" }))
export class EstadoListOutputRestDto {
  @decorate(ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" }))
  meta: PaginationMetaRestDto;

  @decorate(
    ApiProperty({ type: () => [EstadoFindOneOutputRestDto], description: "Resultados da busca" }),
  )
  data: EstadoFindOneOutputRestDto[];
}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@decorate(ApiSchema({ name: "EstadoFindOneInputDto" }))
export class EstadoFindOneInputRestDto {
  @decorate(ApiProperty({ type: "integer", description: "Identificador do registro (numerico)" }))
  @decorate(Type(() => Number))
  @decorate(IsInt())
  id: number;
}
