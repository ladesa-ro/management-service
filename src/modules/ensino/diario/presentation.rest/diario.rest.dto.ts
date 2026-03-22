import {
  AmbienteFindOneInputRestDto,
  AmbienteFindOneOutputRestDto,
} from "@/modules/ambientes/ambiente/presentation.rest";
import { ImagemFindOneOutputRestDto } from "@/modules/ambientes/bloco/presentation.rest";
import {
  diarioCreateSchema,
  diarioFindOneInputSchema,
  diarioPaginationInputSchema,
  diarioUpdateSchema,
} from "@/modules/ensino/diario/domain/diario.schemas";
import {
  DisciplinaFindOneInputRestDto,
  DisciplinaFindOneOutputRestDto,
} from "@/modules/ensino/disciplina/presentation.rest";
import {
  TurmaFindOneInputRestDto,
  TurmaFindOneOutputRestDto,
} from "@/modules/ensino/turma/presentation.rest";
import { CalendarioLetivoFindOneOutputRestDto } from "@/modules/horarios/calendario-letivo/presentation.rest";
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
} from "@/shared/presentation/rest";
import {
  EntityBaseRestDto,
  PaginatedFilterByIdRestDto,
  PaginationMetaRestDto,
} from "@/shared/presentation/rest/dtos";

@ApiSchema({ name: "CalendarioLetivoFindOneInputDto" })
export class CalendarioLetivoFindOneInputRestDto {
  @ApiProperty({
    type: "string",
    description: "Identificador do registro (uuid)",
    format: "uuid",
  })
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
export class DiarioFindOneOutputRestDto extends EntityBaseRestDto {
  @ApiProperty({ type: "boolean", description: "Situacao do diario" })
  ativo: boolean;

  @ApiProperty({
    type: () => CalendarioLetivoFindOneOutputRestDto,
    description: "Calendario letivo vinculado ao diario",
  })
  calendarioLetivo: CalendarioLetivoFindOneOutputRestDto;

  @ApiProperty({
    type: () => TurmaFindOneOutputRestDto,
    description: "Turma vinculada ao diario",
  })
  turma: TurmaFindOneOutputRestDto;

  @ApiProperty({
    type: () => DisciplinaFindOneOutputRestDto,
    description: "Disciplina vinculada ao diario",
  })
  disciplina: DisciplinaFindOneOutputRestDto;

  @ApiPropertyOptional({
    type: () => AmbienteFindOneOutputRestDto,
    description: "Ambiente padrao",
    nullable: true,
  })
  ambientePadrao: AmbienteFindOneOutputRestDto | null;

  @ApiPropertyOptional({
    type: () => ImagemFindOneOutputRestDto,
    description: "Imagem de capa do diario",
    nullable: true,
  })
  imagemCapa: ImagemFindOneOutputRestDto | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ApiSchema({ name: "DiarioListInputDto" })
export class DiarioListInputRestDto extends PaginatedFilterByIdRestDto {
  static schema = diarioPaginationInputSchema;

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    description: "Filtro por ID da Turma",
  })
  @TransformToArray()
  "filter.turma.id"?: string[];

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    description: "Filtro por ID da Disciplina",
  })
  @TransformToArray()
  "filter.disciplina.id"?: string[];

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    description: "Filtro por ID do Ambiente Padrao",
  })
  @TransformToArray()
  "filter.ambientePadrao.id"?: string[];

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    description: "Filtro por ID do Calendario Letivo",
  })
  @TransformToArray()
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
export class DiarioCreateInputRestDto {
  static schema = diarioCreateSchema;

  @ApiProperty({ type: "boolean", description: "Situacao do diario" })
  ativo: boolean;

  @ApiProperty({
    type: () => CalendarioLetivoFindOneInputRestDto,
    description: "Calendario letivo vinculado ao diario",
  })
  calendarioLetivo: CalendarioLetivoFindOneInputRestDto;

  @ApiProperty({ type: () => TurmaFindOneInputRestDto, description: "Turma vinculada ao diario" })
  turma: TurmaFindOneInputRestDto;

  @ApiProperty({
    type: () => DisciplinaFindOneInputRestDto,
    description: "Disciplina vinculada ao diario",
  })
  disciplina: DisciplinaFindOneInputRestDto;

  @ApiPropertyOptional({
    type: () => AmbienteFindOneInputRestDto,
    description: "Ambiente padrao",
    nullable: true,
  })
  ambientePadrao?: AmbienteFindOneInputRestDto | null;
}

@ApiSchema({ name: "DiarioUpdateInputDto" })
export class DiarioUpdateInputRestDto extends PartialType(DiarioCreateInputRestDto) {
  static schema = diarioUpdateSchema;
}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "DiarioFindOneInputDto" })
export class DiarioFindOneInputRestDto {
  static schema = diarioFindOneInputSchema;

  @ApiProperty({
    type: "string",
    description: "Identificador do registro (uuid)",
    format: "uuid",
  })
  id: string;
}
