import { ApiProperty, ApiPropertyOptional, ApiSchema } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsInt, IsOptional, IsString, ValidateNested } from "class-validator";
import {
  RegisterModel,
  referenceProperty,
  simpleProperty,
} from "@/modules/@shared/infrastructure/persistence/typeorm/metadata";
import {
  PaginationInputRestDto,
  PaginationMetaRestDto,
  TransformToArray,
} from "@/modules/@shared/infrastructure/presentation/rest/dtos";
import { EstadoFindOneOutputRestDto } from "@/server/nest/modules/estado/rest/estado.rest.dto";

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
  @ApiProperty({ description: "Identificador do registro (numerico)" })
  @IsInt()
  id: number;

  @ApiProperty({ description: "Nome oficial da cidade" })
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
export class CidadeListInputRestDto extends PaginationInputRestDto {
  @ApiPropertyOptional({
    description: "Filtro por ID",
    type: [String],
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.id"?: string[];

  @ApiPropertyOptional({
    description: "Filtro por ID do Estado",
    type: [String],
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.estado.id"?: string[];

  @ApiPropertyOptional({
    description: "Filtro por nome do Estado",
    type: [String],
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.estado.nome"?: string[];

  @ApiPropertyOptional({
    description: "Filtro por sigla do Estado",
    type: [String],
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
  @ApiProperty({ description: "Identificador do registro (numerico)" })
  @Type(() => Number)
  @IsInt()
  id: number;
}
