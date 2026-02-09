import { ApiProperty, ApiPropertyOptional, ApiSchema, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsOptional,
  IsUUID,
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
import { ImagemFindOneOutputRestDto } from "@/server/nest/modules/bloco/rest";
import { CalendarioLetivoFindOneOutputRestDto } from "@/server/nest/modules/calendario-letivo/rest";
import {
  DisciplinaFindOneInputRestDto,
  DisciplinaFindOneOutputRestDto,
} from "@/server/nest/modules/disciplina/rest";
import {
  TurmaFindOneInputRestDto,
  TurmaFindOneOutputRestDto,
} from "@/server/nest/modules/turma/rest";

@ApiSchema({ name: "CalendarioLetivoFindOneInputDto" })
export class CalendarioLetivoFindOneInputRestDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @IsUUID()
  id: string;
}

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "DiarioFindOneOutputDto" })
@RegisterModel({
  name: "DiarioFindOneOutputDto",
  properties: [
    simpleProperty("id"),
    simpleProperty("ativo"),
    referenceProperty("calendarioLetivo", "CalendarioLetivoFindOneOutputDto"),
    referenceProperty("turma", "TurmaFindOneOutputDto"),
    referenceProperty("disciplina", "DisciplinaFindOneOutputDto"),
    referenceProperty("ambientePadrao", "AmbienteFindOneOutputDto", { nullable: true }),
    referenceProperty("imagemCapa", "ImagemFindOneOutputDto", { nullable: true }),
    ...commonProperties.dated,
  ],
})
export class DiarioFindOneOutputRestDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @IsUUID()
  id: string;

  @ApiProperty({ description: "Situacao do diario" })
  @IsBoolean()
  ativo: boolean;

  @ApiProperty({
    type: () => CalendarioLetivoFindOneOutputRestDto,
    description: "Calendario letivo vinculado ao diario",
  })
  @ValidateNested()
  @Type(() => CalendarioLetivoFindOneOutputRestDto)
  calendarioLetivo: CalendarioLetivoFindOneOutputRestDto;

  @ApiProperty({ type: () => TurmaFindOneOutputRestDto, description: "Turma vinculada ao diario" })
  @ValidateNested()
  @Type(() => TurmaFindOneOutputRestDto)
  turma: TurmaFindOneOutputRestDto;

  @ApiProperty({
    type: () => DisciplinaFindOneOutputRestDto,
    description: "Disciplina vinculada ao diario",
  })
  @ValidateNested()
  @Type(() => DisciplinaFindOneOutputRestDto)
  disciplina: DisciplinaFindOneOutputRestDto;

  @ApiPropertyOptional({
    type: () => AmbienteFindOneOutputRestDto,
    description: "Ambiente padrao",
    nullable: true,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => AmbienteFindOneOutputRestDto)
  ambientePadrao: AmbienteFindOneOutputRestDto | null;

  @ApiPropertyOptional({
    type: () => ImagemFindOneOutputRestDto,
    description: "Imagem de capa do diario",
    nullable: true,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ImagemFindOneOutputRestDto)
  imagemCapa: ImagemFindOneOutputRestDto | null;

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

@ApiSchema({ name: "DiarioListInputDto" })
export class DiarioListInputRestDto extends PaginationInputRestDto {
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
    description: "Filtro por ID da Turma",
    type: [String],
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  "filter.turma.id"?: string[];

  @ApiPropertyOptional({
    description: "Filtro por ID da Disciplina",
    type: [String],
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  "filter.disciplina.id"?: string[];

  @ApiPropertyOptional({
    description: "Filtro por ID do Ambiente Padrao",
    type: [String],
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  "filter.ambientePadrao.id"?: string[];
}

@ApiSchema({ name: "DiarioListOutputDto" })
export class DiarioListOutputRestDto {
  @ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" })
  meta: PaginationMetaRestDto;

  @ApiProperty({ type: () => [DiarioFindOneOutputRestDto], description: "Resultados da busca" })
  data: DiarioFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@ApiSchema({ name: "DiarioCreateInputDto" })
export class DiarioCreateInputRestDto {
  @ApiProperty({ description: "Situacao do diario" })
  @IsBoolean()
  ativo: boolean;

  @ApiProperty({
    type: () => CalendarioLetivoFindOneInputRestDto,
    description: "Calendario letivo vinculado ao diario",
  })
  @ValidateNested()
  @Type(() => CalendarioLetivoFindOneInputRestDto)
  calendarioLetivo: CalendarioLetivoFindOneInputRestDto;

  @ApiProperty({ type: () => TurmaFindOneInputRestDto, description: "Turma vinculada ao diario" })
  @ValidateNested()
  @Type(() => TurmaFindOneInputRestDto)
  turma: TurmaFindOneInputRestDto;

  @ApiProperty({
    type: () => DisciplinaFindOneInputRestDto,
    description: "Disciplina vinculada ao diario",
  })
  @ValidateNested()
  @Type(() => DisciplinaFindOneInputRestDto)
  disciplina: DisciplinaFindOneInputRestDto;

  @ApiPropertyOptional({
    type: () => AmbienteFindOneInputRestDto,
    description: "Ambiente padrao",
    nullable: true,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => AmbienteFindOneInputRestDto)
  ambientePadrao?: AmbienteFindOneInputRestDto | null;
}

@ApiSchema({ name: "DiarioUpdateInputDto" })
export class DiarioUpdateInputRestDto extends PartialType(DiarioCreateInputRestDto) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "DiarioFindOneInputDto" })
export class DiarioFindOneInputRestDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @IsUUID()
  id: string;
}
