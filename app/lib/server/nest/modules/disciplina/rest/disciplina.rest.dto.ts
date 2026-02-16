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
import { ImagemFindOneOutputRestDto } from "@/server/nest/modules/bloco/rest";
import { DisciplinaFieldsMixin } from "../disciplina.validation-mixin";

// ============================================================================
// FindOne Output
// ============================================================================

@decorate(ApiSchema({ name: "DisciplinaFindOneOutputDto" }))
@decorate(
  RegisterModel({
    name: "DisciplinaFindOneOutputDto",
    properties: [
      simpleProperty("id"),
      simpleProperty("nome"),
      simpleProperty("nomeAbreviado"),
      simpleProperty("cargaHoraria"),
      referenceProperty("imagemCapa", "ImagemFindOneOutputDto", { nullable: true }),
      ...commonProperties.dated,
    ],
  }),
)
export class DisciplinaFindOneOutputRestDto extends Mixin(
  EntityBaseRestDto,
  DisciplinaFieldsMixin,
) {
  @decorate(ApiProperty({ type: "string", description: "Nome da disciplina", minLength: 1 }))
  declare nome: string;

  @decorate(
    ApiProperty({ type: "string", description: "Nome abreviado da disciplina", minLength: 1 }),
  )
  declare nomeAbreviado: string;

  @decorate(
    ApiProperty({ type: "integer", description: "Carga horaria da disciplina", minimum: 1 }),
  )
  declare cargaHoraria: number;

  @decorate(
    ApiPropertyOptional({
      type: () => ImagemFindOneOutputRestDto,
      description: "Imagem de capa da disciplina",
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

@decorate(ApiSchema({ name: "DisciplinaListInputDto" }))
export class DisciplinaListInputRestDto extends PaginatedFilterByIdRestDto {
  @decorate(
    ApiPropertyOptional({
      type: "string",
      isArray: true,
      description: "Filtro por ID dos Diarios",
    }),
  )
  @decorate(TransformToArray())
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsUUID(undefined, { each: true }))
  "filter.diarios.id"?: string[];
}

@decorate(ApiSchema({ name: "DisciplinaListOutputDto" }))
export class DisciplinaListOutputRestDto {
  @decorate(ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" }))
  meta: PaginationMetaRestDto;

  @decorate(
    ApiProperty({
      type: () => [DisciplinaFindOneOutputRestDto],
      description: "Resultados da busca",
    }),
  )
  data: DisciplinaFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@decorate(ApiSchema({ name: "DisciplinaCreateInputDto" }))
export class DisciplinaCreateInputRestDto extends DisciplinaFieldsMixin {
  @decorate(ApiProperty({ type: "string", description: "Nome da disciplina", minLength: 1 }))
  declare nome: string;

  @decorate(
    ApiProperty({ type: "string", description: "Nome abreviado da disciplina", minLength: 1 }),
  )
  declare nomeAbreviado: string;

  @decorate(
    ApiProperty({ type: "integer", description: "Carga horaria da disciplina", minimum: 1 }),
  )
  declare cargaHoraria: number;
}

@decorate(ApiSchema({ name: "DisciplinaUpdateInputDto" }))
export class DisciplinaUpdateInputRestDto extends PartialType(DisciplinaCreateInputRestDto) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@decorate(ApiSchema({ name: "DisciplinaFindOneInputDto" }))
export class DisciplinaFindOneInputRestDto {
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
