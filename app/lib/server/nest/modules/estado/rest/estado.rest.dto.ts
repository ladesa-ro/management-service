import { ApiProperty, ApiPropertyOptional, ApiSchema } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsInt, IsOptional, IsString } from "class-validator";
import {
  RegisterModel,
  simpleProperty,
} from "@/modules/@shared/infrastructure/persistence/typeorm/metadata";
import {
  PaginationInputRestDto,
  PaginationMetaRestDto,
  TransformToArray,
} from "@/modules/@shared/infrastructure/presentation/rest/dtos";

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "EstadoFindOneOutputDto" })
@RegisterModel({
  name: "EstadoFindOneOutputDto",
  properties: [simpleProperty("id"), simpleProperty("nome"), simpleProperty("sigla")],
})
export class EstadoFindOneOutputRestDto {
  @ApiProperty({ description: "Identificador do registro (numerico)" })
  @IsInt()
  id: number;

  @ApiProperty({ description: "Nome oficial do estado" })
  @IsString()
  nome: string;

  @ApiProperty({ description: "Sigla do estado" })
  @IsString()
  sigla: string;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ApiSchema({ name: "EstadoListInputDto" })
export class EstadoListInputRestDto extends PaginationInputRestDto {
  @ApiPropertyOptional({
    description: "Filtro por ID",
    type: [String],
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.id"?: string[];
}

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
  @ApiProperty({ description: "Identificador do registro (numerico)" })
  @Type(() => Number)
  @IsInt()
  id: number;
}
