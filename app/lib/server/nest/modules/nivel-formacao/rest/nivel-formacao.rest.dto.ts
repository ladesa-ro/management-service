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
import { NivelFormacaoFieldsMixin } from "@/server/nest/modules/nivel-formacao/nivel-formacao.validation-mixin";

// ============================================================================
// FindOne Output
// ============================================================================

@decorate(ApiSchema({ name: "NivelFormacaoFindOneOutputDto" }))
@decorate(
  RegisterModel({
    name: "NivelFormacaoFindOneOutputDto",
    properties: [simpleProperty("id"), simpleProperty("slug"), ...commonProperties.dated],
  }),
)
export class NivelFormacaoFindOneOutputRestDto extends Mixin(
  EntityBaseRestDto,
  NivelFormacaoFieldsMixin,
) {
  @decorate(
    ApiProperty({ type: "string", description: "Apelido do nivel de formacao", minLength: 1 }),
  )
  declare slug: string;
}

// ============================================================================
// List Input/Output
// ============================================================================

@decorate(ApiSchema({ name: "NivelFormacaoListInputDto" }))
export class NivelFormacaoListInputRestDto extends PaginatedFilterByIdRestDto {}

@decorate(ApiSchema({ name: "NivelFormacaoListOutputDto" }))
export class NivelFormacaoListOutputRestDto {
  @decorate(ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" }))
  meta: PaginationMetaRestDto;

  @decorate(
    ApiProperty({
      type: () => [NivelFormacaoFindOneOutputRestDto],
      description: "Resultados da busca",
    }),
  )
  data: NivelFormacaoFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@decorate(ApiSchema({ name: "NivelFormacaoCreateInputDto" }))
export class NivelFormacaoCreateInputRestDto extends NivelFormacaoFieldsMixin {
  @decorate(
    ApiProperty({ type: "string", description: "Apelido do nivel de formacao", minLength: 1 }),
  )
  declare slug: string;
}

@decorate(ApiSchema({ name: "NivelFormacaoUpdateInputDto" }))
export class NivelFormacaoUpdateInputRestDto extends PartialType(NivelFormacaoCreateInputRestDto) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@decorate(ApiSchema({ name: "NivelFormacaoFindOneInputDto" }))
export class NivelFormacaoFindOneInputRestDto {
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
