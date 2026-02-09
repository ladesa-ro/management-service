import { ApiProperty, ApiPropertyOptional, ApiSchema, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsArray,
  IsDateString,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
  ValidateNested,
} from "class-validator";
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
  AmbienteFindOneInputRestDto,
  AmbienteFindOneOutputRestDto,
} from "@/server/nest/modules/ambiente/rest";
import {
  DiarioFindOneInputRestDto,
  DiarioFindOneOutputRestDto,
} from "@/server/nest/modules/diario/rest";
import {
  IntervaloDeTempoFindOneInputRestDto,
  IntervaloDeTempoFindOneOutputRestDto,
} from "@/server/nest/modules/intervalo-de-tempo/rest";

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "AulaFindOneOutputDto" })
@RegisterModel({
  name: "AulaFindOneOutputDto",
  properties: [
    simpleProperty("id"),
    simpleProperty("data"),
    simpleProperty("modalidade", { nullable: true }),
    referenceProperty("intervaloDeTempo", "IntervaloDeTempoFindOneOutputDto"),
    referenceProperty("diario", "DiarioFindOneOutputDto"),
    referenceProperty("ambiente", "AmbienteFindOneOutputDto", { nullable: true }),
    ...commonProperties.dated,
  ],
})
export class AulaFindOneOutputRestDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @IsUUID()
  id: string;

  @ApiProperty({ description: "Data da aula" })
  @IsDateString()
  data: string;

  @ApiPropertyOptional({ description: "Modalidade da aula", nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(1)
  modalidade: string | null;

  @ApiProperty({
    type: () => IntervaloDeTempoFindOneOutputRestDto,
    description: "Intervalo de tempo associado a aula",
  })
  @ValidateNested()
  @Type(() => IntervaloDeTempoFindOneOutputRestDto)
  intervaloDeTempo: IntervaloDeTempoFindOneOutputRestDto;

  @ApiProperty({ type: () => DiarioFindOneOutputRestDto, description: "Diario associado a aula" })
  @ValidateNested()
  @Type(() => DiarioFindOneOutputRestDto)
  diario: DiarioFindOneOutputRestDto;

  @ApiPropertyOptional({
    type: () => AmbienteFindOneOutputRestDto,
    description: "Ambiente associado a aula",
    nullable: true,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => AmbienteFindOneOutputRestDto)
  ambiente: AmbienteFindOneOutputRestDto | null;

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

@ApiSchema({ name: "AulaListInputDto" })
export class AulaListInputRestDto extends PaginationInputRestDto {
  @ApiPropertyOptional({
    description: "Filtro por ID",
    type: [String],
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  "filter.id"?: string[];

  @ApiPropertyOptional({
    description: "Filtro por ID do Intervalo de Tempo",
    type: [String],
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  "filter.intervaloDeTempo.id"?: string[];

  @ApiPropertyOptional({
    description: "Filtro por ID do Diario",
    type: [String],
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  "filter.diario.id"?: string[];

  @ApiPropertyOptional({
    description: "Filtro por ID do Ambiente",
    type: [String],
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  "filter.ambiente.id"?: string[];
}

@ApiSchema({ name: "AulaListOutputDto" })
export class AulaListOutputRestDto {
  @ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" })
  meta: PaginationMetaRestDto;

  @ApiProperty({ type: () => [AulaFindOneOutputRestDto], description: "Resultados da busca" })
  data: AulaFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@ApiSchema({ name: "AulaCreateInputDto" })
export class AulaCreateInputRestDto {
  @ApiProperty({ description: "Data da aula" })
  @IsDateString()
  data: string;

  @ApiPropertyOptional({ description: "Modalidade da aula", nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(1)
  modalidade?: string | null;

  @ApiProperty({
    type: () => IntervaloDeTempoFindOneInputRestDto,
    description: "Intervalo de tempo associado a aula",
  })
  @ValidateNested()
  @Type(() => IntervaloDeTempoFindOneInputRestDto)
  intervaloDeTempo: IntervaloDeTempoFindOneInputRestDto;

  @ApiProperty({ type: () => DiarioFindOneInputRestDto, description: "Diario associado a aula" })
  @ValidateNested()
  @Type(() => DiarioFindOneInputRestDto)
  diario: DiarioFindOneInputRestDto;

  @ApiPropertyOptional({
    type: () => AmbienteFindOneInputRestDto,
    description: "Ambiente associado a aula",
    nullable: true,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => AmbienteFindOneInputRestDto)
  ambiente?: AmbienteFindOneInputRestDto | null;
}

@ApiSchema({ name: "AulaUpdateInputDto" })
export class AulaUpdateInputRestDto extends PartialType(AulaCreateInputRestDto) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "AulaFindOneInputDto" })
export class AulaFindOneInputRestDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @IsUUID()
  id: string;
}
