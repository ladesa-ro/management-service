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
  DiarioProfessorFindOneInputRestDto,
  DiarioProfessorFindOneOutputRestDto,
} from "@/server/nest/modules/diario-professor/rest";
import {
  HorarioGeradoFindOneInputRestDto,
  HorarioGeradoFindOneOutputRestDto,
} from "@/server/nest/modules/horario-gerado/rest";
import {
  IntervaloDeTempoFindOneInputRestDto,
  IntervaloDeTempoFindOneOutputRestDto,
} from "@/server/nest/modules/intervalo-de-tempo/rest/intervalo-de-tempo.rest.dto";
import { HorarioGeradoAulaFieldsMixin } from "../horario-gerado-aula.validation-mixin";

// ============================================================================
// FindOne Output
// ============================================================================

@decorate(ApiSchema({ name: "HorarioGeradoAulaFindOneOutputDto" }))
@decorate(
  RegisterModel({
    name: "HorarioGeradoAulaFindOneOutputDto",
    properties: [
      simpleProperty("id"),
      simpleProperty("data"),
      referenceProperty("intervaloDeTempo", "IntervaloDeTempoFindOneOutputDto"),
      referenceProperty("diarioProfessor", "DiarioProfessorFindOneOutputDto"),
      referenceProperty("horarioGerado", "HorarioGeradoFindOneOutputDto"),
      ...commonProperties.dated,
    ],
  }),
)
export class HorarioGeradoAulaFindOneOutputRestDto extends Mixin(
  EntityBaseRestDto,
  HorarioGeradoAulaFieldsMixin,
) {
  @decorate(ApiProperty({ type: "string", description: "Data da aula gerada" }))
  declare data: Date;

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
    ApiProperty({
      type: () => DiarioProfessorFindOneOutputRestDto,
      description: "Vinculo de diario e professor",
    }),
  )
  @decorate(ValidateNested())
  @decorate(Type(() => DiarioProfessorFindOneOutputRestDto))
  diarioProfessor: DiarioProfessorFindOneOutputRestDto;

  @decorate(
    ApiProperty({
      type: () => HorarioGeradoFindOneOutputRestDto,
      description: "Horario ao qual a aula pertence",
    }),
  )
  @decorate(ValidateNested())
  @decorate(Type(() => HorarioGeradoFindOneOutputRestDto))
  horarioGerado: HorarioGeradoFindOneOutputRestDto;
}

// ============================================================================
// List Input/Output
// ============================================================================

@decorate(ApiSchema({ name: "HorarioGeradoAulaListInputDto" }))
export class HorarioGeradoAulaListInputRestDto extends PaginatedFilterByIdRestDto {
  @decorate(
    ApiPropertyOptional({
      type: "string",
      isArray: true,
      description: "Filtro por ID do Horario Gerado",
    }),
  )
  @decorate(TransformToArray())
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsUUID(undefined, { each: true }))
  "filter.horarioGerado.id"?: string[];
}

@decorate(ApiSchema({ name: "HorarioGeradoAulaListOutputDto" }))
export class HorarioGeradoAulaListOutputRestDto {
  @decorate(ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" }))
  meta: PaginationMetaRestDto;

  @decorate(
    ApiProperty({
      type: () => [HorarioGeradoAulaFindOneOutputRestDto],
      description: "Resultados da busca",
    }),
  )
  data: HorarioGeradoAulaFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@decorate(ApiSchema({ name: "HorarioGeradoAulaCreateInputDto" }))
export class HorarioGeradoAulaCreateInputRestDto extends HorarioGeradoAulaFieldsMixin {
  @decorate(ApiProperty({ type: "string", description: "Data da aula gerada" }))
  declare data: Date;

  @decorate(
    ApiProperty({
      type: () => IntervaloDeTempoFindOneInputRestDto,
      description: "Intervalo de tempo",
    }),
  )
  @decorate(ValidateNested())
  @decorate(Type(() => IntervaloDeTempoFindOneInputRestDto))
  intervaloDeTempo: IntervaloDeTempoFindOneInputRestDto;

  @decorate(
    ApiProperty({
      type: () => DiarioProfessorFindOneInputRestDto,
      description: "Vinculo de diario e professor",
    }),
  )
  @decorate(ValidateNested())
  @decorate(Type(() => DiarioProfessorFindOneInputRestDto))
  diarioProfessor: DiarioProfessorFindOneInputRestDto;

  @decorate(
    ApiProperty({
      type: () => HorarioGeradoFindOneInputRestDto,
      description: "Horario ao qual a aula pertence",
    }),
  )
  @decorate(ValidateNested())
  @decorate(Type(() => HorarioGeradoFindOneInputRestDto))
  horarioGerado: HorarioGeradoFindOneInputRestDto;
}

@decorate(ApiSchema({ name: "HorarioGeradoAulaUpdateInputDto" }))
export class HorarioGeradoAulaUpdateInputRestDto extends PartialType(
  HorarioGeradoAulaCreateInputRestDto,
) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@decorate(ApiSchema({ name: "HorarioGeradoAulaFindOneInputDto" }))
export class HorarioGeradoAulaFindOneInputRestDto {
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
