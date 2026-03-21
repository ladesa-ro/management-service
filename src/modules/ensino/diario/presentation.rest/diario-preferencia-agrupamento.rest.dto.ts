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
  RegisterModel,
  referenceProperty,
  simpleProperty,
  TransformToArray,
} from "@/modules/@shared/presentation/rest";
import {
  IsArray,
  IsDateString,
  IsInt,
  IsOptional,
  IsUUID,
  Max,
  Min,
  Type,
  ValidateNested,
} from "@/modules/@shared/presentation/shared";
import { DiarioPreferenciaAgrupamentoFieldsMixin } from "@/modules/ensino/diario/presentation.validations/diario-preferencia-agrupamento.validation-mixin";
import { DiarioFindOneOutputRestDto } from "./diario.rest.dto";

// ============================================================================
// Parent Route Params
// ============================================================================

@ApiSchema({ name: "DiarioPreferenciaAgrupamentoParentParamsDto" })
export class DiarioPreferenciaAgrupamentoParentParamsRestDto {
  @ApiProperty({
    type: "string",
    description: "ID do diario (uuid)",
    format: "uuid",
  })
  @IsUUID()
  diarioId: string;
}

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "DiarioPreferenciaAgrupamentoFindOneOutputDto" })
@RegisterModel({
  name: "DiarioPreferenciaAgrupamentoFindOneQueryResult",
  properties: [
    simpleProperty("id"),
    simpleProperty("dataInicio"),
    simpleProperty("dataFim", { nullable: true }),
    simpleProperty("diaSemanaIso"),
    simpleProperty("aulasSeguidas"),
    referenceProperty("diario", "DiarioFindOneQueryResult"),
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
// Bulk Replace Input
// ============================================================================

@ApiSchema({ name: "DiarioPreferenciaAgrupamentoBulkReplaceItemDto" })
export class DiarioPreferenciaAgrupamentoBulkReplaceItemRestDto {
  @ApiProperty({
    type: "string",
    description: "Inicio da vigencia da preferencia de agrupamento",
  })
  @IsDateString()
  dataInicio: string;

  @ApiPropertyOptional({
    type: "string",
    description: "Fim da vigencia da preferencia de agrupamento",
    nullable: true,
  })
  @IsOptional()
  @IsDateString()
  dataFim?: string | null;

  @ApiProperty({
    type: "integer",
    description: "Dia da semana (ISO 8601: 1=Segunda, 7=Domingo)",
    minimum: 1,
    maximum: 7,
  })
  @IsInt()
  @Min(1)
  @Max(7)
  diaSemanaIso: number;

  @ApiProperty({ type: "integer", description: "Quantidade de aulas seguidas", minimum: 1 })
  @IsInt()
  @Min(1)
  aulasSeguidas: number;
}

@ApiSchema({ name: "DiarioPreferenciaAgrupamentoBulkReplaceInputDto" })
export class DiarioPreferenciaAgrupamentoBulkReplaceInputRestDto {
  @ApiProperty({
    type: () => [DiarioPreferenciaAgrupamentoBulkReplaceItemRestDto],
    description: "Lista de preferencias de agrupamento para vincular ao diario",
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DiarioPreferenciaAgrupamentoBulkReplaceItemRestDto)
  preferenciasAgrupamento: DiarioPreferenciaAgrupamentoBulkReplaceItemRestDto[];
}
