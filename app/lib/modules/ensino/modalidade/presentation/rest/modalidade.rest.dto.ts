import { ApiProperty, ApiSchema, PartialType } from "@nestjs/swagger";
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
import { ModalidadeFieldsMixin } from "../modalidade.validation-mixin";

// ============================================================================
// FindOne Output
// ============================================================================

@decorate(ApiSchema({ name: "ModalidadeFindOneOutputDto" }))
@decorate(
  RegisterModel({
    name: "ModalidadeFindOneOutputDto",
    properties: [
      simpleProperty("id"),
      simpleProperty("nome"),
      simpleProperty("slug"),
      ...commonProperties.dated,
    ],
  }),
)
export class ModalidadeFindOneOutputRestDto extends Mixin(
  EntityBaseRestDto,
  ModalidadeFieldsMixin,
) {
  @decorate(ApiProperty({ type: "string", description: "Nome da modalidade", minLength: 1 }))
  declare nome: string;

  @decorate(ApiProperty({ type: "string", description: "Apelido da modalidade", minLength: 1 }))
  declare slug: string;
}

// ============================================================================
// List Input/Output
// ============================================================================

@decorate(ApiSchema({ name: "ModalidadeListInputDto" }))
export class ModalidadeListInputRestDto extends PaginatedFilterByIdRestDto {}

@decorate(ApiSchema({ name: "ModalidadeListOutputDto" }))
export class ModalidadeListOutputRestDto {
  @decorate(ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" }))
  meta: PaginationMetaRestDto;

  @decorate(
    ApiProperty({
      type: () => [ModalidadeFindOneOutputRestDto],
      description: "Resultados da busca",
    }),
  )
  data: ModalidadeFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@decorate(ApiSchema({ name: "ModalidadeCreateInputDto" }))
export class ModalidadeCreateInputRestDto extends ModalidadeFieldsMixin {
  @decorate(ApiProperty({ type: "string", description: "Nome da modalidade", minLength: 1 }))
  declare nome: string;

  @decorate(ApiProperty({ type: "string", description: "Apelido da modalidade", minLength: 1 }))
  declare slug: string;
}

@decorate(ApiSchema({ name: "ModalidadeUpdateInputDto" }))
export class ModalidadeUpdateInputRestDto extends PartialType(ModalidadeCreateInputRestDto) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@decorate(ApiSchema({ name: "ModalidadeFindOneInputDto" }))
export class ModalidadeFindOneInputRestDto {
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
