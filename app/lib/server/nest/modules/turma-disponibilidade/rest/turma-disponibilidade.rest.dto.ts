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
  DisponibilidadeFindOneInputRestDto,
  DisponibilidadeFindOneOutputRestDto,
} from "@/server/nest/modules/disponibilidade/rest/disponibilidade.rest.dto";
import {
  TurmaFindOneInputRestDto,
  TurmaFindOneOutputRestDto,
} from "@/server/nest/modules/turma/rest";

// ============================================================================
// FindOne Output
// ============================================================================

@decorate(ApiSchema({ name: "TurmaDisponibilidadeFindOneOutputDto" }))
@decorate(
  RegisterModel({
    name: "TurmaDisponibilidadeFindOneOutputDto",
    properties: [
      simpleProperty("id"),
      referenceProperty("disponibilidade", "DisponibilidadeFindOneOutputDto"),
      referenceProperty("turma", "TurmaFindOneOutputDto"),
      ...commonProperties.dated,
    ],
  }),
)
export class TurmaDisponibilidadeFindOneOutputRestDto extends EntityBaseRestDto {
  @decorate(
    ApiProperty({
      type: () => DisponibilidadeFindOneOutputRestDto,
      description: "Disponibilidade",
    }),
  )
  @decorate(ValidateNested())
  @decorate(Type(() => DisponibilidadeFindOneOutputRestDto))
  disponibilidade: DisponibilidadeFindOneOutputRestDto;

  @decorate(ApiProperty({ type: () => TurmaFindOneOutputRestDto, description: "Turma" }))
  @decorate(ValidateNested())
  @decorate(Type(() => TurmaFindOneOutputRestDto))
  turma: TurmaFindOneOutputRestDto;
}

// ============================================================================
// List Input/Output
// ============================================================================

@decorate(ApiSchema({ name: "TurmaDisponibilidadeListInputDto" }))
export class TurmaDisponibilidadeListInputRestDto extends PaginatedFilterByIdRestDto {}

@decorate(ApiSchema({ name: "TurmaDisponibilidadeListOutputDto" }))
export class TurmaDisponibilidadeListOutputRestDto {
  @decorate(ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" }))
  meta: PaginationMetaRestDto;

  @decorate(
    ApiProperty({
      type: () => [TurmaDisponibilidadeFindOneOutputRestDto],
      description: "Resultados da busca",
    }),
  )
  data: TurmaDisponibilidadeFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@decorate(ApiSchema({ name: "TurmaDisponibilidadeCreateInputDto" }))
export class TurmaDisponibilidadeCreateInputRestDto {
  @decorate(
    ApiProperty({ type: () => DisponibilidadeFindOneInputRestDto, description: "Disponibilidade" }),
  )
  @decorate(ValidateNested())
  @decorate(Type(() => DisponibilidadeFindOneInputRestDto))
  disponibilidade: DisponibilidadeFindOneInputRestDto;

  @decorate(ApiProperty({ type: () => TurmaFindOneInputRestDto, description: "Turma" }))
  @decorate(ValidateNested())
  @decorate(Type(() => TurmaFindOneInputRestDto))
  turma: TurmaFindOneInputRestDto;
}

@decorate(ApiSchema({ name: "TurmaDisponibilidadeUpdateInputDto" }))
export class TurmaDisponibilidadeUpdateInputRestDto extends PartialType(
  TurmaDisponibilidadeCreateInputRestDto,
) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@decorate(ApiSchema({ name: "TurmaDisponibilidadeFindOneInputDto" }))
export class TurmaDisponibilidadeFindOneInputRestDto {
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
