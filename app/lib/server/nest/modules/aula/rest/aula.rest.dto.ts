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
import {
  DiarioFindOneInputRestDto,
  DiarioFindOneOutputRestDto,
} from "@/server/nest/modules/diario/rest";
import {
  IntervaloDeTempoFindOneInputRestDto,
  IntervaloDeTempoFindOneOutputRestDto,
} from "@/server/nest/modules/intervalo-de-tempo/rest";
import { AulaFieldsMixin } from "../aula.validation-mixin";

// ============================================================================
// FindOne Output
// ============================================================================

@decorate(ApiSchema({ name: "AulaFindOneOutputDto" }))
@decorate(
  RegisterModel({
    name: "AulaFindOneOutputDto",
    properties: [
      simpleProperty("id"),
      simpleProperty("data"),
      simpleProperty("modalidade", { nullable: true }),
      referenceProperty("intervaloDeTempo", "IntervaloDeTempoFindOneOutputDto"),
      referenceProperty("diario", "DiarioFindOneOutputDto"),
      referenceProperty("ambiente", "AmbienteFindOneOutputDto", { nullable: true }),
      ...commonProperties.dated,
    ],
  }),
)
export class AulaFindOneOutputRestDto extends Mixin(EntityBaseRestDto, AulaFieldsMixin) {
  @decorate(ApiProperty({ type: "string", description: "Data da aula" }))
  declare data: string;

  @decorate(
    ApiPropertyOptional({ type: "string", description: "Modalidade da aula", nullable: true }),
  )
  declare modalidade: string | null;

  @decorate(
    ApiProperty({
      type: () => IntervaloDeTempoFindOneOutputRestDto,
      description: "Intervalo de tempo associado a aula",
    }),
  )
  @decorate(ValidateNested())
  @decorate(Type(() => IntervaloDeTempoFindOneOutputRestDto))
  intervaloDeTempo: IntervaloDeTempoFindOneOutputRestDto;

  @decorate(
    ApiProperty({ type: () => DiarioFindOneOutputRestDto, description: "Diario associado a aula" }),
  )
  @decorate(ValidateNested())
  @decorate(Type(() => DiarioFindOneOutputRestDto))
  diario: DiarioFindOneOutputRestDto;

  @decorate(
    ApiPropertyOptional({
      type: () => AmbienteFindOneOutputRestDto,
      description: "Ambiente associado a aula",
      nullable: true,
    }),
  )
  @decorate(IsOptional())
  @decorate(ValidateNested())
  @decorate(Type(() => AmbienteFindOneOutputRestDto))
  ambiente: AmbienteFindOneOutputRestDto | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

@decorate(ApiSchema({ name: "AulaListInputDto" }))
export class AulaListInputRestDto extends PaginatedFilterByIdRestDto {
  @decorate(
    ApiPropertyOptional({
      type: "string",
      isArray: true,
      description: "Filtro por ID do Intervalo de Tempo",
    }),
  )
  @decorate(TransformToArray())
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsUUID(undefined, { each: true }))
  "filter.intervaloDeTempo.id"?: string[];

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

  @decorate(
    ApiPropertyOptional({
      type: "string",
      isArray: true,
      description: "Filtro por ID do Ambiente",
    }),
  )
  @decorate(TransformToArray())
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsUUID(undefined, { each: true }))
  "filter.ambiente.id"?: string[];
}

@decorate(ApiSchema({ name: "AulaListOutputDto" }))
export class AulaListOutputRestDto {
  @decorate(ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" }))
  meta: PaginationMetaRestDto;

  @decorate(
    ApiProperty({ type: () => [AulaFindOneOutputRestDto], description: "Resultados da busca" }),
  )
  data: AulaFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@decorate(ApiSchema({ name: "AulaCreateInputDto" }))
export class AulaCreateInputRestDto extends AulaFieldsMixin {
  @decorate(ApiProperty({ type: "string", description: "Data da aula" }))
  declare data: string;

  @decorate(
    ApiPropertyOptional({ type: "string", description: "Modalidade da aula", nullable: true }),
  )
  declare modalidade?: string | null;

  @decorate(
    ApiProperty({
      type: () => IntervaloDeTempoFindOneInputRestDto,
      description: "Intervalo de tempo associado a aula",
    }),
  )
  @decorate(ValidateNested())
  @decorate(Type(() => IntervaloDeTempoFindOneInputRestDto))
  intervaloDeTempo: IntervaloDeTempoFindOneInputRestDto;

  @decorate(
    ApiProperty({ type: () => DiarioFindOneInputRestDto, description: "Diario associado a aula" }),
  )
  @decorate(ValidateNested())
  @decorate(Type(() => DiarioFindOneInputRestDto))
  diario: DiarioFindOneInputRestDto;

  @decorate(
    ApiPropertyOptional({
      type: () => AmbienteFindOneInputRestDto,
      description: "Ambiente associado a aula",
      nullable: true,
    }),
  )
  @decorate(IsOptional())
  @decorate(ValidateNested())
  @decorate(Type(() => AmbienteFindOneInputRestDto))
  ambiente?: AmbienteFindOneInputRestDto | null;
}

@decorate(ApiSchema({ name: "AulaUpdateInputDto" }))
export class AulaUpdateInputRestDto extends PartialType(AulaCreateInputRestDto) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@decorate(ApiSchema({ name: "AulaFindOneInputDto" }))
export class AulaFindOneInputRestDto {
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
