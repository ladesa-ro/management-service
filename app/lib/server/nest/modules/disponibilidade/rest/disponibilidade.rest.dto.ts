import { ApiProperty, ApiPropertyOptional, ApiSchema, PartialType } from "@nestjs/swagger";
import { IsArray, IsDateString, IsOptional, IsUUID } from "class-validator";
import {
  commonProperties,
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

@ApiSchema({ name: "DisponibilidadeFindOneOutputDto" })
@RegisterModel({
  name: "DisponibilidadeFindOneOutputDto",
  properties: [
    simpleProperty("id"),
    simpleProperty("dataInicio"),
    simpleProperty("dataFim", { nullable: true }),
    ...commonProperties.dated,
  ],
})
export class DisponibilidadeFindOneOutputRestDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @IsUUID()
  id: string;

  @ApiProperty({ description: "Data de inicio" })
  @IsDateString()
  dataInicio: Date;

  @ApiPropertyOptional({ description: "Data de termino", nullable: true })
  @IsOptional()
  @IsDateString()
  dataFim: Date | null;

  @ApiProperty({ description: "Data e hora da criacao do registro" })
  @IsDateString()
  dateCreated: Date;

  @ApiProperty({ description: "Data e hora da alteracao do registro" })
  @IsDateString()
  dateUpdated: Date;

  @ApiPropertyOptional({ description: "Data e hora da exclusao do registro", nullable: true })
  @IsOptional()
  @IsDateString()
  dateDeleted: Date | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ApiSchema({ name: "DisponibilidadeListInputDto" })
export class DisponibilidadeListInputRestDto extends PaginationInputRestDto {
  @ApiPropertyOptional({
    description: "Filtro por ID",
    type: [String],
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  "filter.id"?: string[];
}

@ApiSchema({ name: "DisponibilidadeListOutputDto" })
export class DisponibilidadeListOutputRestDto {
  @ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" })
  meta: PaginationMetaRestDto;

  @ApiProperty({
    type: () => [DisponibilidadeFindOneOutputRestDto],
    description: "Resultados da busca",
  })
  data: DisponibilidadeFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@ApiSchema({ name: "DisponibilidadeCreateInputDto" })
export class DisponibilidadeCreateInputRestDto {
  @ApiProperty({ description: "Data de inicio" })
  @IsDateString()
  dataInicio: Date;

  @ApiPropertyOptional({ description: "Data de termino", nullable: true })
  @IsOptional()
  @IsDateString()
  dataFim?: Date | null;
}

@ApiSchema({ name: "DisponibilidadeUpdateInputDto" })
export class DisponibilidadeUpdateInputRestDto extends PartialType(
  DisponibilidadeCreateInputRestDto,
) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "DisponibilidadeFindOneInputDto" })
export class DisponibilidadeFindOneInputRestDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @IsUUID()
  id: string;
}
