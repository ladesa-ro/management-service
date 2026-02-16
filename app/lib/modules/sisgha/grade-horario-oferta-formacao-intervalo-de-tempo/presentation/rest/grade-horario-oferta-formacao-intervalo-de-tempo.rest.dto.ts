import { ApiProperty, ApiSchema, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsUUID, ValidateNested } from "class-validator";
import { decorate } from "ts-mixer";
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
} from "@/modules/@shared/infrastructure/presentation/rest/dtos";
import {
  GradeHorarioOfertaFormacaoFindOneInputRestDto,
  GradeHorarioOfertaFormacaoFindOneOutputRestDto,
} from "@/modules/sisgha/grade-horario-oferta-formacao/presentation/rest";
import {
  IntervaloDeTempoFindOneInputRestDto,
  IntervaloDeTempoFindOneOutputRestDto,
} from "@/modules/sisgha/intervalo-de-tempo/presentation/rest/intervalo-de-tempo.rest.dto";

// ============================================================================
// FindOne Output
// ============================================================================

@decorate(ApiSchema({ name: "GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputDto" }))
@decorate(
  RegisterModel({
    name: "GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputDto",
    properties: [
      simpleProperty("id"),
      referenceProperty("gradeHorarioOfertaFormacao", "GradeHorarioOfertaFormacaoFindOneOutputDto"),
      referenceProperty("intervaloDeTempo", "IntervaloDeTempoFindOneOutputDto"),
      ...commonProperties.dated,
    ],
  }),
)
export class GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputRestDto extends EntityBaseRestDto {
  @decorate(
    ApiProperty({
      type: () => GradeHorarioOfertaFormacaoFindOneOutputRestDto,
      description: "Grade horaria da oferta de formacao",
    }),
  )
  @decorate(ValidateNested())
  @decorate(Type(() => GradeHorarioOfertaFormacaoFindOneOutputRestDto))
  gradeHorarioOfertaFormacao: GradeHorarioOfertaFormacaoFindOneOutputRestDto;

  @decorate(
    ApiProperty({
      type: () => IntervaloDeTempoFindOneOutputRestDto,
      description: "Intervalo de tempo",
    }),
  )
  @decorate(ValidateNested())
  @decorate(Type(() => IntervaloDeTempoFindOneOutputRestDto))
  intervaloDeTempo: IntervaloDeTempoFindOneOutputRestDto;
}

// ============================================================================
// List Input/Output
// ============================================================================

@decorate(ApiSchema({ name: "GradeHorarioOfertaFormacaoIntervaloDeTempoListInputDto" }))
export class GradeHorarioOfertaFormacaoIntervaloDeTempoListInputRestDto extends PaginatedFilterByIdRestDto {}

@decorate(ApiSchema({ name: "GradeHorarioOfertaFormacaoIntervaloDeTempoListOutputDto" }))
export class GradeHorarioOfertaFormacaoIntervaloDeTempoListOutputRestDto {
  @decorate(ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" }))
  meta: PaginationMetaRestDto;

  @decorate(
    ApiProperty({
      type: () => [GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputRestDto],
      description: "Resultados da busca",
    }),
  )
  data: GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@decorate(ApiSchema({ name: "GradeHorarioOfertaFormacaoIntervaloDeTempoCreateInputDto" }))
export class GradeHorarioOfertaFormacaoIntervaloDeTempoCreateInputRestDto {
  @decorate(
    ApiProperty({
      type: () => GradeHorarioOfertaFormacaoFindOneInputRestDto,
      description: "Grade horaria da oferta de formacao",
    }),
  )
  @decorate(ValidateNested())
  @decorate(Type(() => GradeHorarioOfertaFormacaoFindOneInputRestDto))
  gradeHorarioOfertaFormacao: GradeHorarioOfertaFormacaoFindOneInputRestDto;

  @decorate(
    ApiProperty({
      type: () => IntervaloDeTempoFindOneInputRestDto,
      description: "Intervalo de tempo",
    }),
  )
  @decorate(ValidateNested())
  @decorate(Type(() => IntervaloDeTempoFindOneInputRestDto))
  intervaloDeTempo: IntervaloDeTempoFindOneInputRestDto;
}

@decorate(ApiSchema({ name: "GradeHorarioOfertaFormacaoIntervaloDeTempoUpdateInputDto" }))
export class GradeHorarioOfertaFormacaoIntervaloDeTempoUpdateInputRestDto extends PartialType(
  GradeHorarioOfertaFormacaoIntervaloDeTempoCreateInputRestDto,
) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@decorate(ApiSchema({ name: "GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInputDto" }))
export class GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInputRestDto {
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
