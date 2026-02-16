import { ApiProperty, ApiPropertyOptional, ApiSchema, PartialType } from "@nestjs/swagger";
import { IsUUID } from "class-validator";
import { decorate, Mixin } from "ts-mixer";
import {
  commonProperties,
  RegisterModel,
  simpleProperty,
} from "@/modules/@shared/infrastructure/persistence/typeorm/metadata";
import {
  EntityBaseRestDto,
  PaginatedFilterByIdRestDto,
  PaginationMetaRestDto,
} from "@/modules/@shared/infrastructure/presentation/rest/dtos";
import { DisponibilidadeFieldsMixin } from "../disponibilidade.validation-mixin";

// ============================================================================
// FindOne Output
// ============================================================================

@decorate(ApiSchema({ name: "DisponibilidadeFindOneOutputDto" }))
@decorate(
  RegisterModel({
    name: "DisponibilidadeFindOneOutputDto",
    properties: [
      simpleProperty("id"),
      simpleProperty("dataInicio"),
      simpleProperty("dataFim", { nullable: true }),
      ...commonProperties.dated,
    ],
  }),
)
export class DisponibilidadeFindOneOutputRestDto extends Mixin(
  EntityBaseRestDto,
  DisponibilidadeFieldsMixin,
) {
  @decorate(ApiProperty({ type: "string", description: "Data de inicio" }))
  declare dataInicio: Date;

  @decorate(ApiPropertyOptional({ type: "string", description: "Data de termino", nullable: true }))
  declare dataFim: Date | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

@decorate(ApiSchema({ name: "DisponibilidadeListInputDto" }))
export class DisponibilidadeListInputRestDto extends PaginatedFilterByIdRestDto {}

@decorate(ApiSchema({ name: "DisponibilidadeListOutputDto" }))
export class DisponibilidadeListOutputRestDto {
  @decorate(ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" }))
  meta: PaginationMetaRestDto;

  @decorate(
    ApiProperty({
      type: () => [DisponibilidadeFindOneOutputRestDto],
      description: "Resultados da busca",
    }),
  )
  data: DisponibilidadeFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@decorate(ApiSchema({ name: "DisponibilidadeCreateInputDto" }))
export class DisponibilidadeCreateInputRestDto extends DisponibilidadeFieldsMixin {
  @decorate(ApiProperty({ type: "string", description: "Data de inicio" }))
  declare dataInicio: Date;

  @decorate(ApiPropertyOptional({ type: "string", description: "Data de termino", nullable: true }))
  declare dataFim: Date | null;
}

@decorate(ApiSchema({ name: "DisponibilidadeUpdateInputDto" }))
export class DisponibilidadeUpdateInputRestDto extends PartialType(
  DisponibilidadeCreateInputRestDto,
) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@decorate(ApiSchema({ name: "DisponibilidadeFindOneInputDto" }))
export class DisponibilidadeFindOneInputRestDto {
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
