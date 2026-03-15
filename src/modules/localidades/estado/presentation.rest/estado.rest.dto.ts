import {
  PaginatedFilterByStringIdRestDto,
  PaginationMetaRestDto,
} from "@/modules/@shared/infrastructure/presentation/rest/dtos";
import {
  ApiProperty,
  ApiSchema,
  RegisterModel,
  simpleProperty,
} from "@/modules/@shared/presentation/rest";
import { IsInt, IsString, Type } from "@/modules/@shared/presentation/shared";

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "EstadoFindOneOutputDto" })
@RegisterModel({
  name: "EstadoFindOneOutputDto",
  properties: [simpleProperty("id"), simpleProperty("nome"), simpleProperty("sigla")],
})
export class EstadoFindOneOutputRestDto {
  @ApiProperty({ type: "integer", description: "Identificador do registro (numerico)" })
  @IsInt()
  id: number;

  @ApiProperty({ type: "string", description: "Nome oficial do estado" })
  @IsString()
  nome: string;

  @ApiProperty({ type: "string", description: "Sigla do estado" })
  @IsString()
  sigla: string;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ApiSchema({ name: "EstadoListInputDto" })
export class EstadoListInputRestDto extends PaginatedFilterByStringIdRestDto {}

@ApiSchema({ name: "EstadoListOutputDto" })
export class EstadoListOutputRestDto {
  @ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" })
  meta: PaginationMetaRestDto;

  @ApiProperty({ type: () => [EstadoFindOneOutputRestDto], description: "Resultados da busca" })
  data: EstadoFindOneOutputRestDto[];
}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "EstadoFindOneInputDto" })
export class EstadoFindOneInputRestDto {
  @ApiProperty({ type: "integer", description: "Identificador do registro (numerico)" })
  @Type(() => Number)
  @IsInt()
  id: number;
}
