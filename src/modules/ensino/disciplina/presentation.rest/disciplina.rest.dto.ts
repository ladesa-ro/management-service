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
import { ImagemFindOneOutputRestDto } from "@/modules/ambientes/bloco/presentation.rest";
import { DisciplinaFieldsMixin } from "../presentation.validations/disciplina.validation-mixin";

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "DisciplinaFindOneOutputDto" })
@RegisterModel({
  name: "DisciplinaFindOneQueryResult",
  properties: [
    simpleProperty("id"),
    simpleProperty("nome"),
    simpleProperty("nomeAbreviado"),
    simpleProperty("cargaHoraria"),
    referenceProperty("imagemCapa", "ImagemFindOneQueryResult", { nullable: true }),
    ...commonProperties.dated,
  ],
})
export class DisciplinaFindOneOutputRestDto extends Mixin(
  EntityBaseRestDto,
  DisciplinaFieldsMixin,
) {
  @ApiProperty({ type: "string", description: "Nome da disciplina", minLength: 1 })
  declare nome: string;

  @ApiProperty({ type: "string", description: "Nome abreviado da disciplina", minLength: 1 })
  declare nomeAbreviado: string;

  @ApiProperty({ type: "integer", description: "Carga horaria da disciplina", minimum: 1 })
  declare cargaHoraria: number;

  @ApiPropertyOptional({
    type: () => ImagemFindOneOutputRestDto,
    description: "Imagem de capa da disciplina",
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

@ApiSchema({ name: "DisciplinaListInputDto" })
export class DisciplinaListInputRestDto extends PaginatedFilterByIdRestDto {
  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    description: "Filtro por ID dos Diarios",
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  "filter.diarios.id"?: string[];
}

@ApiSchema({ name: "DisciplinaListOutputDto" })
export class DisciplinaListOutputRestDto {
  @ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" })
  meta: PaginationMetaRestDto;

  @ApiProperty({
    type: () => [DisciplinaFindOneOutputRestDto],
    description: "Resultados da busca",
  })
  data: DisciplinaFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@ApiSchema({ name: "DisciplinaCreateInputDto" })
export class DisciplinaCreateInputRestDto extends DisciplinaFieldsMixin {
  @ApiProperty({ type: "string", description: "Nome da disciplina", minLength: 1 })
  declare nome: string;

  @ApiProperty({ type: "string", description: "Nome abreviado da disciplina", minLength: 1 })
  declare nomeAbreviado: string;

  @ApiProperty({ type: "integer", description: "Carga horaria da disciplina", minimum: 1 })
  declare cargaHoraria: number;
}

@ApiSchema({ name: "DisciplinaUpdateInputDto" })
export class DisciplinaUpdateInputRestDto extends PartialType(DisciplinaCreateInputRestDto) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "DisciplinaFindOneInputDto" })
export class DisciplinaFindOneInputRestDto {
  @ApiProperty({
    type: "string",
    description: "Identificador do registro (uuid)",
    format: "uuid",
  })
  @IsUUID()
  id: string;
}
