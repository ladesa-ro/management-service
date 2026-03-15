import {
  PaginatedFilterByStringIdRestDto,
  PaginationMetaRestDto,
} from "@/modules/@shared/infrastructure/presentation/rest/dtos";
import {
  ApiProperty,
  ApiPropertyOptional,
  ApiSchema,
  RegisterModel,
  referenceProperty,
  simpleProperty,
  TransformToArray,
} from "@/modules/@shared/presentation/rest";
import {
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  Type,
  ValidateNested,
} from "@/modules/@shared/presentation/shared";
import { EstadoFindOneOutputRestDto } from "@/modules/localidades/estado/presentation.rest/estado.rest.dto";

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "CidadeFindOneOutputDto" })
@RegisterModel({
  name: "CidadeFindOneOutputDto",
  properties: [
    simpleProperty("id"),
    simpleProperty("nome"),
    referenceProperty("estado", "EstadoFindOneOutputDto"),
  ],
})
export class CidadeFindOneOutputRestDto {
  @ApiProperty({ type: "integer", description: "Identificador do registro (numerico)" })
  @IsInt()
  id: number;

  @ApiProperty({ type: "string", description: "Nome oficial da cidade" })
  @IsString()
  nome: string;

  @ApiProperty({ type: () => EstadoFindOneOutputRestDto, description: "Estado da cidade" })
  @ValidateNested()
  @Type(() => EstadoFindOneOutputRestDto)
  estado: EstadoFindOneOutputRestDto;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ApiSchema({ name: "CidadeListInputDto" })
export class CidadeListInputRestDto extends PaginatedFilterByStringIdRestDto {
  @ApiPropertyOptional({
    description: "Filtro por ID do Estado",
    type: "string",
    isArray: true,
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.estado.id"?: string[];

  @ApiPropertyOptional({
    description: "Filtro por nome do Estado",
    type: "string",
    isArray: true,
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.estado.nome"?: string[];

  @ApiPropertyOptional({
    description: "Filtro por sigla do Estado",
    type: "string",
    isArray: true,
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.estado.sigla"?: string[];
}

@ApiSchema({ name: "CidadeListOutputDto" })
export class CidadeListOutputRestDto {
  @ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" })
  meta: PaginationMetaRestDto;

  @ApiProperty({ type: () => [CidadeFindOneOutputRestDto], description: "Resultados da busca" })
  data: CidadeFindOneOutputRestDto[];
}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "CidadeFindOneInputDto" })
export class CidadeFindOneInputRestDto {
  @ApiProperty({ type: "integer", description: "Identificador do registro (numerico)" })
  @Type(() => Number)
  @IsInt()
  id: number;
}
