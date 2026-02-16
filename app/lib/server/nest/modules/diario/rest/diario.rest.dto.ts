import { ApiProperty, ApiPropertyOptional, ApiSchema, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsOptional, IsUUID, ValidateNested } from "class-validator";
import { decorate, Mixin } from "ts-mixer";
import {
  commonProperties,
  RegisterModel,
  referenceProperty,
  simpleProperty,
} from "@/modules/@shared/infrastructure/persistence/typeorm/metadata";
import {
  EntityBaseRestDto,
  PaginatedFilterByIdRestDto,
  PaginationMetaRestDto,
  TransformToArray,
} from "@/modules/@shared/infrastructure/presentation/rest/dtos";
import {
  AmbienteFindOneInputRestDto,
  AmbienteFindOneOutputRestDto,
} from "@/server/nest/modules/ambiente/rest";
import { ImagemFindOneOutputRestDto } from "@/server/nest/modules/bloco/rest";
import { CalendarioLetivoFindOneOutputRestDto } from "@/server/nest/modules/calendario-letivo/rest";
import { DiarioFieldsMixin } from "@/server/nest/modules/diario/diario.validation-mixin";
import {
  DisciplinaFindOneInputRestDto,
  DisciplinaFindOneOutputRestDto,
} from "@/server/nest/modules/disciplina/rest";
import {
  TurmaFindOneInputRestDto,
  TurmaFindOneOutputRestDto,
} from "@/server/nest/modules/turma/rest";

@decorate(ApiSchema({ name: "CalendarioLetivoFindOneInputDto" }))
export class CalendarioLetivoFindOneInputRestDto {
  @decorate(
    ApiProperty({
      type: "string",
      description: "Identificador do registro (uuid)",
      format: "uuid",
    }),
  )
  @decorate(IsUUID())
  id: string;
}

// ============================================================================
// FindOne Output
// ============================================================================

@decorate(ApiSchema({ name: "DiarioFindOneOutputDto" }))
@decorate(
  RegisterModel({
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
  }),
)
export class DiarioFindOneOutputRestDto extends Mixin(EntityBaseRestDto, DiarioFieldsMixin) {
  @decorate(ApiProperty({ type: "boolean", description: "Situacao do diario" }))
  declare ativo: boolean;

  @decorate(
    ApiProperty({
      type: () => CalendarioLetivoFindOneOutputRestDto,
      description: "Calendario letivo vinculado ao diario",
    }),
  )
  @decorate(ValidateNested())
  @decorate(Type(() => CalendarioLetivoFindOneOutputRestDto))
  calendarioLetivo: CalendarioLetivoFindOneOutputRestDto;

  @decorate(
    ApiProperty({
      type: () => TurmaFindOneOutputRestDto,
      description: "Turma vinculada ao diario",
    }),
  )
  @decorate(ValidateNested())
  @decorate(Type(() => TurmaFindOneOutputRestDto))
  turma: TurmaFindOneOutputRestDto;

  @decorate(
    ApiProperty({
      type: () => DisciplinaFindOneOutputRestDto,
      description: "Disciplina vinculada ao diario",
    }),
  )
  @decorate(ValidateNested())
  @decorate(Type(() => DisciplinaFindOneOutputRestDto))
  disciplina: DisciplinaFindOneOutputRestDto;

  @decorate(
    ApiPropertyOptional({
      type: () => AmbienteFindOneOutputRestDto,
      description: "Ambiente padrao",
      nullable: true,
    }),
  )
  @decorate(IsOptional())
  @decorate(ValidateNested())
  @decorate(Type(() => AmbienteFindOneOutputRestDto))
  ambientePadrao: AmbienteFindOneOutputRestDto | null;

  @decorate(
    ApiPropertyOptional({
      type: () => ImagemFindOneOutputRestDto,
      description: "Imagem de capa do diario",
      nullable: true,
    }),
  )
  @decorate(IsOptional())
  @decorate(ValidateNested())
  @decorate(Type(() => ImagemFindOneOutputRestDto))
  imagemCapa: ImagemFindOneOutputRestDto | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

@decorate(ApiSchema({ name: "DiarioListInputDto" }))
export class DiarioListInputRestDto extends PaginatedFilterByIdRestDto {
  @decorate(
    ApiPropertyOptional({
      type: "string",
      isArray: true,
      description: "Filtro por ID da Turma",
    }),
  )
  @decorate(TransformToArray())
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsUUID(undefined, { each: true }))
  "filter.turma.id"?: string[];

  @decorate(
    ApiPropertyOptional({
      type: "string",
      isArray: true,
      description: "Filtro por ID da Disciplina",
    }),
  )
  @decorate(TransformToArray())
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsUUID(undefined, { each: true }))
  "filter.disciplina.id"?: string[];

  @decorate(
    ApiPropertyOptional({
      type: "string",
      isArray: true,
      description: "Filtro por ID do Ambiente Padrao",
    }),
  )
  @decorate(TransformToArray())
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsUUID(undefined, { each: true }))
  "filter.ambientePadrao.id"?: string[];
}

@decorate(ApiSchema({ name: "DiarioListOutputDto" }))
export class DiarioListOutputRestDto {
  @decorate(ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" }))
  meta: PaginationMetaRestDto;

  @decorate(
    ApiProperty({ type: () => [DiarioFindOneOutputRestDto], description: "Resultados da busca" }),
  )
  data: DiarioFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@decorate(ApiSchema({ name: "DiarioCreateInputDto" }))
export class DiarioCreateInputRestDto extends DiarioFieldsMixin {
  @decorate(ApiProperty({ type: "boolean", description: "Situacao do diario" }))
  declare ativo: boolean;

  @decorate(
    ApiProperty({
      type: () => CalendarioLetivoFindOneInputRestDto,
      description: "Calendario letivo vinculado ao diario",
    }),
  )
  @decorate(ValidateNested())
  @decorate(Type(() => CalendarioLetivoFindOneInputRestDto))
  calendarioLetivo: CalendarioLetivoFindOneInputRestDto;

  @decorate(
    ApiProperty({ type: () => TurmaFindOneInputRestDto, description: "Turma vinculada ao diario" }),
  )
  @decorate(ValidateNested())
  @decorate(Type(() => TurmaFindOneInputRestDto))
  turma: TurmaFindOneInputRestDto;

  @decorate(
    ApiProperty({
      type: () => DisciplinaFindOneInputRestDto,
      description: "Disciplina vinculada ao diario",
    }),
  )
  @decorate(ValidateNested())
  @decorate(Type(() => DisciplinaFindOneInputRestDto))
  disciplina: DisciplinaFindOneInputRestDto;

  @decorate(
    ApiPropertyOptional({
      type: () => AmbienteFindOneInputRestDto,
      description: "Ambiente padrao",
      nullable: true,
    }),
  )
  @decorate(IsOptional())
  @decorate(ValidateNested())
  @decorate(Type(() => AmbienteFindOneInputRestDto))
  ambientePadrao?: AmbienteFindOneInputRestDto | null;
}

@decorate(ApiSchema({ name: "DiarioUpdateInputDto" }))
export class DiarioUpdateInputRestDto extends PartialType(DiarioCreateInputRestDto) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@decorate(ApiSchema({ name: "DiarioFindOneInputDto" }))
export class DiarioFindOneInputRestDto {
  @decorate(
    ApiProperty({
      type: "string",
      description: "Identificador do registro (uuid)",
      format: "uuid",
    }),
  )
  @decorate(IsUUID())
  id: string;
}
