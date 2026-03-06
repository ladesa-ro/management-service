import { ApiProperty, ApiSchema, PartialType } from "@nestjs/swagger";
import { IsUUID } from "class-validator";
import { decorate, Mixin } from "ts-mixer";
import {
  EntityBaseRestDto,
  PaginatedFilterByIdRestDto,
  PaginationMetaRestDto,
} from "@/Ladesa.Management.Application/@shared/infrastructure/presentation/rest/dtos";
import { NivelFormacaoFieldsMixin } from "@/Ladesa.Management.Application/ensino/nivel-formacao/presentation/nivel-formacao.validation-mixin";
import {
  commonProperties,
  RegisterModel,
  simpleProperty,
} from "@/Ladesa.Management.Infrastructure.Database/typeorm/metadata";

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
