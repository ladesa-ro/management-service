import {
  ApiProperty,
  ApiSchema,
  commonProperties,
  PartialType,
  RegisterModel,
  simpleProperty,
} from "@/shared/presentation/rest";
import {
  EntityBaseRestDto,
  PaginatedFilterByIdRestDto,
  PaginationMetaRestDto,
} from "@/shared/presentation/rest/dtos";
import {
  nivelFormacaoCreateSchema,
  nivelFormacaoFindOneInputSchema,
  nivelFormacaoPaginationInputSchema,
} from "../domain/nivel-formacao.schemas";

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "NivelFormacaoFindOneOutputDto" })
@RegisterModel({
  name: "NivelFormacaoFindOneQueryResult",
  properties: [simpleProperty("id"), simpleProperty("slug"), ...commonProperties.dated],
})
export class NivelFormacaoFindOneOutputRestDto extends EntityBaseRestDto {
  @ApiProperty({ type: "string", description: "Apelido do nivel de formacao", minLength: 1 })
  slug: string;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ApiSchema({ name: "NivelFormacaoListInputDto" })
export class NivelFormacaoListInputRestDto extends PaginatedFilterByIdRestDto {
  static schema = nivelFormacaoPaginationInputSchema;
}

@ApiSchema({ name: "NivelFormacaoListOutputDto" })
export class NivelFormacaoListOutputRestDto {
  @ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" })
  meta: PaginationMetaRestDto;

  @ApiProperty({
    type: () => [NivelFormacaoFindOneOutputRestDto],
    description: "Resultados da busca",
  })
  data: NivelFormacaoFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@ApiSchema({ name: "NivelFormacaoCreateInputDto" })
export class NivelFormacaoCreateInputRestDto {
  static readonly schema = nivelFormacaoCreateSchema;

  @ApiProperty({ type: "string", description: "Apelido do nivel de formacao", minLength: 1 })
  slug: string;
}

@ApiSchema({ name: "NivelFormacaoUpdateInputDto" })
export class NivelFormacaoUpdateInputRestDto extends PartialType(NivelFormacaoCreateInputRestDto) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "NivelFormacaoFindOneInputDto" })
export class NivelFormacaoFindOneInputRestDto {
  static readonly schema = nivelFormacaoFindOneInputSchema;

  @ApiProperty({
    type: "string",
    description: "Identificador do registro (uuid)",
    format: "uuid",
  })
  id: string;
}
