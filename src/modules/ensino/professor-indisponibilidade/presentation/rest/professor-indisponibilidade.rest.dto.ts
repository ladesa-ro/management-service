import { ApiProperty, ApiPropertyOptional, ApiSchema } from "@nestjs/swagger";
import { IsOptional, IsUUID } from "class-validator";
import { decorate, Mixin } from "ts-mixer";
import {
  commonProperties,
  RegisterModel,
  simpleProperty,
} from "@/modules/@shared/infrastructure/persistence/typeorm/metadata";
import {
  EntityBaseRestDto,
  PaginationInputRestDto,
  PaginationMetaRestDto,
} from "@/modules/@shared/infrastructure/presentation/rest/dtos";
import { ProfessorIndisponibilidadeFieldsMixin } from "../professor-indisponibilidade.validation-mixin";

// ============================================================================
// FindOne Output
// ============================================================================

@decorate(ApiSchema({ name: "ProfessorIndisponibilidadeFindOneOutputDto" }))
@decorate(
  RegisterModel({
    name: "ProfessorIndisponibilidadeFindOneOutputDto",
    properties: [
      simpleProperty("id"),
      simpleProperty("idPerfilFk"),
      simpleProperty("diaDaSemana"),
      simpleProperty("horaInicio"),
      simpleProperty("horaFim"),
      simpleProperty("motivo"),
      ...commonProperties.dated,
    ],
  }),
)
export class ProfessorIndisponibilidadeFindOneOutputRestDto extends Mixin(
  EntityBaseRestDto,
  ProfessorIndisponibilidadeFieldsMixin,
) {
  @decorate(
    ApiProperty({ type: "string", description: "Identificador do perfil (uuid)", format: "uuid" }),
  )
  @decorate(IsUUID())
  idPerfilFk: string;

  @decorate(
    ApiProperty({
      type: "integer",
      description: "Dia da semana (0=domingo, 1=segunda, ..., 6=sabado)",
    }),
  )
  declare diaDaSemana: number;

  @decorate(ApiProperty({ type: "string", description: "Hora de inicio da indisponibilidade" }))
  declare horaInicio: string;

  @decorate(ApiProperty({ type: "string", description: "Hora de termino da indisponibilidade" }))
  declare horaFim: string;

  @decorate(ApiProperty({ type: "string", description: "Motivo da indisponibilidade" }))
  declare motivo: string;
}

// ============================================================================
// List Input/Output
// ============================================================================

@decorate(ApiSchema({ name: "ProfessorIndisponibilidadeListInputDto" }))
export class ProfessorIndisponibilidadeListInputRestDto extends PaginationInputRestDto {
  @decorate(
    ApiPropertyOptional({
      type: "string",
      description: "Filtro por ID do perfil",
    }),
  )
  @decorate(IsOptional())
  @decorate(IsUUID())
  "filter.perfil.id"?: string;
}

@decorate(ApiSchema({ name: "ProfessorIndisponibilidadeListOutputDto" }))
export class ProfessorIndisponibilidadeListOutputRestDto {
  @decorate(ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" }))
  meta: PaginationMetaRestDto;

  @decorate(
    ApiProperty({
      type: () => [ProfessorIndisponibilidadeFindOneOutputRestDto],
      description: "Resultados da busca",
    }),
  )
  data: ProfessorIndisponibilidadeFindOneOutputRestDto[];
}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@decorate(ApiSchema({ name: "ProfessorIndisponibilidadeFindOneInputDto" }))
export class ProfessorIndisponibilidadeFindOneInputRestDto {
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
