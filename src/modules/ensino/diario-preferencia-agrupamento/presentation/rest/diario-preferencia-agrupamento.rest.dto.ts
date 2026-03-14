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
  DiarioFindOneInputRestDto,
  DiarioFindOneOutputRestDto,
} from "@/modules/ensino/diario/presentation/rest";
import { DiarioPreferenciaAgrupamentoFieldsMixin } from "@/modules/ensino/diario-preferencia-agrupamento/presentation/diario-preferencia-agrupamento.validation-mixin";

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "DiarioPreferenciaAgrupamentoFindOneOutputDto" })
@RegisterModel({
  name: "DiarioPreferenciaAgrupamentoFindOneOutputDto",
  properties: [
    simpleProperty("id"),
    simpleProperty("dataInicio"),
    simpleProperty("dataFim", { nullable: true }),
    simpleProperty("diaSemanaIso"),
    simpleProperty("aulasSeguidas"),
    referenceProperty("diario", "DiarioFindOneOutputDto"),
    ...commonProperties.dated,
  ],
})
export class DiarioPreferenciaAgrupamentoFindOneOutputRestDto extends Mixin(
  EntityBaseRestDto,
  DiarioPreferenciaAgrupamentoFieldsMixin,
) {
  @ApiProperty({
    type: "string",
    description: "Inicio da vigencia da preferencia de agrupamento",
  })
  declare dataInicio: string;

  @ApiPropertyOptional({
    type: "string",
    description: "Fim da vigencia da preferencia de agrupamento",
    nullable: true,
  })
  declare dataFim: string | null;

  @ApiProperty({
    type: "integer",
    description: "Dia da semana (ISO 8601: 1=Segunda, 7=Domingo)",
    minimum: 1,
    maximum: 7,
  })
  declare diaSemanaIso: number;

  @ApiProperty({ type: "integer", description: "Quantidade de aulas seguidas", minimum: 1 })
  declare aulasSeguidas: number;

  @ApiProperty({ type: () => DiarioFindOneOutputRestDto, description: "Diario vinculado" })
  @ValidateNested()
  @Type(() => DiarioFindOneOutputRestDto)
  diario: DiarioFindOneOutputRestDto;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ApiSchema({ name: "DiarioPreferenciaAgrupamentoListInputDto" })
export class DiarioPreferenciaAgrupamentoListInputRestDto extends PaginatedFilterByIdRestDto {
  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    description: "Filtro por ID do Diario",
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  "filter.diario.id"?: string[];
}

@ApiSchema({ name: "DiarioPreferenciaAgrupamentoListOutputDto" })
export class DiarioPreferenciaAgrupamentoListOutputRestDto {
  @ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" })
  meta: PaginationMetaRestDto;

  @ApiProperty({
    type: () => [DiarioPreferenciaAgrupamentoFindOneOutputRestDto],
    description: "Resultados da busca",
  })
  data: DiarioPreferenciaAgrupamentoFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@ApiSchema({ name: "DiarioPreferenciaAgrupamentoCreateInputDto" })
export class DiarioPreferenciaAgrupamentoCreateInputRestDto extends DiarioPreferenciaAgrupamentoFieldsMixin {
  @ApiProperty({
    type: "string",
    description: "Inicio da vigencia da preferencia de agrupamento",
  })
  declare dataInicio: string;

  @ApiPropertyOptional({
    type: "string",
    description: "Fim da vigencia da preferencia de agrupamento",
    nullable: true,
  })
  declare dataFim?: string | null;

  @ApiProperty({
    type: "integer",
    description: "Dia da semana (ISO 8601: 1=Segunda, 7=Domingo)",
    minimum: 1,
    maximum: 7,
  })
  declare diaSemanaIso: number;

  @ApiProperty({ type: "integer", description: "Quantidade de aulas seguidas", minimum: 1 })
  declare aulasSeguidas: number;

  @ApiProperty({ type: () => DiarioFindOneInputRestDto, description: "Diario vinculado" })
  @ValidateNested()
  @Type(() => DiarioFindOneInputRestDto)
  diario: DiarioFindOneInputRestDto;
}

@ApiSchema({ name: "DiarioPreferenciaAgrupamentoUpdateInputDto" })
export class DiarioPreferenciaAgrupamentoUpdateInputRestDto extends PartialType(
  DiarioPreferenciaAgrupamentoCreateInputRestDto,
) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "DiarioPreferenciaAgrupamentoFindOneInputDto" })
export class DiarioPreferenciaAgrupamentoFindOneInputRestDto {
  @ApiProperty({
    type: "string",
    description: "Identificador do registro (uuid)",
    format: "uuid",
  })
  @IsUUID()
  id: string;
}
