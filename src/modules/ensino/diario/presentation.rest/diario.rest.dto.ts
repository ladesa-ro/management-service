import { Mixin } from "ts-mixer";
import {
  EntityBaseRestDto,
  PaginatedFilterByIdRestDto,
  PaginationMetaRestDto,
} from "@/modules/@shared/infrastructure/presentation/rest/dtos";
import {
  ApiProperty,
  ApiPropertyOptional,
  ApiSchema,
  commonProperties,
  PartialType,
  RegisterModel,
  referenceProperty,
  simpleProperty,
  TransformToArray,
} from "@/modules/@shared/presentation/rest";
import {
  IsArray,
  IsOptional,
  IsUUID,
  Type,
  ValidateNested,
} from "@/modules/@shared/presentation/shared";
import {
  AmbienteFindOneInputRestDto,
  AmbienteFindOneOutputRestDto,
} from "@/modules/ambientes/ambiente/presentation.rest";
import { ImagemFindOneOutputRestDto } from "@/modules/ambientes/bloco/presentation.rest";
import { DiarioFieldsMixin } from "@/modules/ensino/diario/presentation.validations/diario.validation-mixin";
import {
  DisciplinaFindOneInputRestDto,
  DisciplinaFindOneOutputRestDto,
} from "@/modules/ensino/disciplina/presentation.rest";
import {
  TurmaFindOneInputRestDto,
  TurmaFindOneOutputRestDto,
} from "@/modules/ensino/turma/presentation.rest";
import { CalendarioLetivoFindOneOutputRestDto } from "@/modules/horarios/calendario-letivo/presentation.rest";

@ApiSchema({ name: "CalendarioLetivoFindOneInputDto" })
export class CalendarioLetivoFindOneInputRestDto {
  @ApiProperty({
    type: "string",
    description: "Identificador do registro (uuid)",
    format: "uuid",
  })
  @IsUUID()
  id: string;
}

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "DiarioFindOneOutputDto" })
@RegisterModel({
  name: "DiarioFindOneQueryResult",
  properties: [
    simpleProperty("id"),
    simpleProperty("ativo"),
    referenceProperty("calendarioLetivo", "CalendarioLetivoFindOneQueryResult"),
    referenceProperty("turma", "TurmaFindOneQueryResult"),
    referenceProperty("disciplina", "DisciplinaFindOneQueryResult"),
    referenceProperty("ambientePadrao", "AmbienteFindOneQueryResult", { nullable: true }),
    referenceProperty("imagemCapa", "ImagemFindOneQueryResult", { nullable: true }),
    ...commonProperties.dated,
  ],
})
export class DiarioFindOneOutputRestDto extends Mixin(EntityBaseRestDto, DiarioFieldsMixin) {
  @ApiProperty({ type: "boolean", description: "Situacao do diario" })
  declare ativo: boolean;

  @ApiProperty({
    type: () => CalendarioLetivoFindOneOutputRestDto,
    description: "Calendario letivo vinculado ao diario",
  })
  @ValidateNested()
  @Type(() => CalendarioLetivoFindOneOutputRestDto)
  calendarioLetivo: CalendarioLetivoFindOneOutputRestDto;

  @ApiProperty({
    type: () => TurmaFindOneOutputRestDto,
    description: "Turma vinculada ao diario",
  })
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
}

// ============================================================================
// List Input/Output
// ============================================================================

@ApiSchema({ name: "DiarioListInputDto" })
export class DiarioListInputRestDto extends PaginatedFilterByIdRestDto {
  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    description: "Filtro por ID da Turma",
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  "filter.turma.id"?: string[];

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    description: "Filtro por ID da Disciplina",
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  "filter.disciplina.id"?: string[];

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    description: "Filtro por ID do Ambiente Padrao",
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  "filter.ambientePadrao.id"?: string[];

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    description: "Filtro por ID do Calendario Letivo",
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  "filter.calendarioLetivo.id"?: string[];
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
export class DiarioCreateInputRestDto extends DiarioFieldsMixin {
  @ApiProperty({ type: "boolean", description: "Situacao do diario" })
  declare ativo: boolean;

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
  @ApiProperty({
    type: "string",
    description: "Identificador do registro (uuid)",
    format: "uuid",
  })
  @IsUUID()
  id: string;
}
