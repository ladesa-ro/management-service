import { ApiProperty, ApiPropertyOptional, ApiSchema, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsDateString, IsOptional, IsUUID, ValidateNested } from "class-validator";
import {
  commonProperties,
  RegisterModel,
  referenceProperty,
  simpleProperty,
} from "@/modules/@shared/infrastructure/persistence/typeorm/metadata";
import {
  PaginationInputRestDto,
  PaginationMetaRestDto,
  TransformToArray,
} from "@/modules/@shared/infrastructure/presentation/rest/dtos";
import {
  DisponibilidadeFindOneInputRestDto,
  DisponibilidadeFindOneOutputRestDto,
} from "@/server/nest/modules/disponibilidade/rest/disponibilidade.rest.dto";
import {
  TurmaFindOneInputRestDto,
  TurmaFindOneOutputRestDto,
} from "@/server/nest/modules/turma/rest";

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "TurmaDisponibilidadeFindOneOutputDto" })
@RegisterModel({
  name: "TurmaDisponibilidadeFindOneOutputDto",
  properties: [
    simpleProperty("id"),
    referenceProperty("disponibilidade", "DisponibilidadeFindOneOutputDto"),
    referenceProperty("turma", "TurmaFindOneOutputDto"),
    ...commonProperties.dated,
  ],
})
export class TurmaDisponibilidadeFindOneOutputRestDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @IsUUID()
  id: string;

  @ApiProperty({ type: () => DisponibilidadeFindOneOutputRestDto, description: "Disponibilidade" })
  @ValidateNested()
  @Type(() => DisponibilidadeFindOneOutputRestDto)
  disponibilidade: DisponibilidadeFindOneOutputRestDto;

  @ApiProperty({ type: () => TurmaFindOneOutputRestDto, description: "Turma" })
  @ValidateNested()
  @Type(() => TurmaFindOneOutputRestDto)
  turma: TurmaFindOneOutputRestDto;

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

@ApiSchema({ name: "TurmaDisponibilidadeListInputDto" })
export class TurmaDisponibilidadeListInputRestDto extends PaginationInputRestDto {
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

@ApiSchema({ name: "TurmaDisponibilidadeListOutputDto" })
export class TurmaDisponibilidadeListOutputRestDto {
  @ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" })
  meta: PaginationMetaRestDto;

  @ApiProperty({
    type: () => [TurmaDisponibilidadeFindOneOutputRestDto],
    description: "Resultados da busca",
  })
  data: TurmaDisponibilidadeFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@ApiSchema({ name: "TurmaDisponibilidadeCreateInputDto" })
export class TurmaDisponibilidadeCreateInputRestDto {
  @ApiProperty({ type: () => DisponibilidadeFindOneInputRestDto, description: "Disponibilidade" })
  @ValidateNested()
  @Type(() => DisponibilidadeFindOneInputRestDto)
  disponibilidade: DisponibilidadeFindOneInputRestDto;

  @ApiProperty({ type: () => TurmaFindOneInputRestDto, description: "Turma" })
  @ValidateNested()
  @Type(() => TurmaFindOneInputRestDto)
  turma: TurmaFindOneInputRestDto;
}

@ApiSchema({ name: "TurmaDisponibilidadeUpdateInputDto" })
export class TurmaDisponibilidadeUpdateInputRestDto extends PartialType(
  TurmaDisponibilidadeCreateInputRestDto,
) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "TurmaDisponibilidadeFindOneInputDto" })
export class TurmaDisponibilidadeFindOneInputRestDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @IsUUID()
  id: string;
}
