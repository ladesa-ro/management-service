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
  DiarioFindOneInputRestDto,
  DiarioFindOneOutputRestDto,
} from "@/modules/ensino/diario/presentation/rest";
import { DiarioPreferenciaAgrupamentoFieldsMixin } from "@/modules/ensino/diario-preferencia-agrupamento/presentation/diario-preferencia-agrupamento.validation-mixin";
import {
  IntervaloDeTempoFindOneInputRestDto,
  IntervaloDeTempoFindOneOutputRestDto,
} from "@/modules/horarios/intervalo-de-tempo/presentation/rest";

// ============================================================================
// FindOne Output
// ============================================================================

@decorate(ApiSchema({ name: "DiarioPreferenciaAgrupamentoFindOneOutputDto" }))
@decorate(
  RegisterModel({
    name: "DiarioPreferenciaAgrupamentoFindOneOutputDto",
    properties: [
      simpleProperty("id"),
      simpleProperty("dataInicio"),
      simpleProperty("dataFim", { nullable: true }),
      simpleProperty("diaSemanaIso"),
      simpleProperty("aulasSeguidas"),
      referenceProperty("intervaloDeTempo", "IntervaloDeTempoFindOneOutputDto"),
      referenceProperty("diario", "DiarioFindOneOutputDto"),
      ...commonProperties.dated,
    ],
  }),
)
export class DiarioPreferenciaAgrupamentoFindOneOutputRestDto extends Mixin(
  EntityBaseRestDto,
  DiarioPreferenciaAgrupamentoFieldsMixin,
) {
  @decorate(
    ApiProperty({
      type: "string",
      description: "Inicio da vigencia da preferencia de agrupamento",
    }),
  )
  declare dataInicio: string;

  @decorate(
    ApiPropertyOptional({
      type: "string",
      description: "Fim da vigencia da preferencia de agrupamento",
      nullable: true,
    }),
  )
  declare dataFim: string | null;

  @decorate(
    ApiProperty({
      type: "integer",
      description: "Dia da semana (ISO 8601: 1=Segunda, 7=Domingo)",
      minimum: 1,
      maximum: 7,
    }),
  )
  declare diaSemanaIso: number;

  @decorate(
    ApiProperty({ type: "integer", description: "Quantidade de aulas seguidas", minimum: 1 }),
  )
  declare aulasSeguidas: number;

  @decorate(
    ApiProperty({
      type: () => IntervaloDeTempoFindOneOutputRestDto,
      description: "Intervalo de tempo",
    }),
  )
  @decorate(ValidateNested())
  @decorate(Type(() => IntervaloDeTempoFindOneOutputRestDto))
  intervaloDeTempo: IntervaloDeTempoFindOneOutputRestDto;

  @decorate(
    ApiProperty({ type: () => DiarioFindOneOutputRestDto, description: "Diario vinculado" }),
  )
  @decorate(ValidateNested())
  @decorate(Type(() => DiarioFindOneOutputRestDto))
  diario: DiarioFindOneOutputRestDto;
}

// ============================================================================
// List Input/Output
// ============================================================================

@decorate(ApiSchema({ name: "DiarioPreferenciaAgrupamentoListInputDto" }))
export class DiarioPreferenciaAgrupamentoListInputRestDto extends PaginatedFilterByIdRestDto {
  @decorate(
    ApiPropertyOptional({
      type: "string",
      isArray: true,
      description: "Filtro por ID do Diario",
    }),
  )
  @decorate(TransformToArray())
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsUUID(undefined, { each: true }))
  "filter.diario.id"?: string[];
}

@decorate(ApiSchema({ name: "DiarioPreferenciaAgrupamentoListOutputDto" }))
export class DiarioPreferenciaAgrupamentoListOutputRestDto {
  @decorate(ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" }))
  meta: PaginationMetaRestDto;

  @decorate(
    ApiProperty({
      type: () => [DiarioPreferenciaAgrupamentoFindOneOutputRestDto],
      description: "Resultados da busca",
    }),
  )
  data: DiarioPreferenciaAgrupamentoFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@decorate(ApiSchema({ name: "DiarioPreferenciaAgrupamentoCreateInputDto" }))
export class DiarioPreferenciaAgrupamentoCreateInputRestDto extends DiarioPreferenciaAgrupamentoFieldsMixin {
  @decorate(
    ApiProperty({
      type: "string",
      description: "Inicio da vigencia da preferencia de agrupamento",
    }),
  )
  declare dataInicio: string;

  @decorate(
    ApiPropertyOptional({
      type: "string",
      description: "Fim da vigencia da preferencia de agrupamento",
      nullable: true,
    }),
  )
  declare dataFim?: string | null;

  @decorate(
    ApiProperty({
      type: "integer",
      description: "Dia da semana (ISO 8601: 1=Segunda, 7=Domingo)",
      minimum: 1,
      maximum: 7,
    }),
  )
  declare diaSemanaIso: number;

  @decorate(
    ApiProperty({ type: "integer", description: "Quantidade de aulas seguidas", minimum: 1 }),
  )
  declare aulasSeguidas: number;

  @decorate(
    ApiProperty({
      type: () => IntervaloDeTempoFindOneInputRestDto,
      description: "Intervalo de tempo",
    }),
  )
  @decorate(ValidateNested())
  @decorate(Type(() => IntervaloDeTempoFindOneInputRestDto))
  intervaloDeTempo: IntervaloDeTempoFindOneInputRestDto;

  @decorate(ApiProperty({ type: () => DiarioFindOneInputRestDto, description: "Diario vinculado" }))
  @decorate(ValidateNested())
  @decorate(Type(() => DiarioFindOneInputRestDto))
  diario: DiarioFindOneInputRestDto;
}

@decorate(ApiSchema({ name: "DiarioPreferenciaAgrupamentoUpdateInputDto" }))
export class DiarioPreferenciaAgrupamentoUpdateInputRestDto extends PartialType(
  DiarioPreferenciaAgrupamentoCreateInputRestDto,
) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@decorate(ApiSchema({ name: "DiarioPreferenciaAgrupamentoFindOneInputDto" }))
export class DiarioPreferenciaAgrupamentoFindOneInputRestDto {
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
