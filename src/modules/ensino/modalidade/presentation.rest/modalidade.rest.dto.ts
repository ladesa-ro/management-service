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
  modalidadeCreateSchema,
  modalidadeFindOneInputSchema,
  modalidadePaginationInputSchema,
} from "../domain/modalidade.schemas";

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "ModalidadeFindOneOutputDto" })
@RegisterModel({
  name: "ModalidadeFindOneQueryResult",
  properties: [
    simpleProperty("id"),
    simpleProperty("nome"),
    simpleProperty("slug"),
    ...commonProperties.dated,
  ],
})
export class ModalidadeFindOneOutputRestDto extends EntityBaseRestDto {
  @ApiProperty({ type: "string", description: "Nome da modalidade", minLength: 1 })
  nome: string;

  @ApiProperty({ type: "string", description: "Apelido da modalidade", minLength: 1 })
  slug: string;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ApiSchema({ name: "ModalidadeListInputDto" })
export class ModalidadeListInputRestDto extends PaginatedFilterByIdRestDto {
  static schema = modalidadePaginationInputSchema;
}

@ApiSchema({ name: "ModalidadeListOutputDto" })
export class ModalidadeListOutputRestDto {
  @ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" })
  meta: PaginationMetaRestDto;

  @ApiProperty({
    type: () => [ModalidadeFindOneOutputRestDto],
    description: "Resultados da busca",
  })
  data: ModalidadeFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@ApiSchema({ name: "ModalidadeCreateInputDto" })
export class ModalidadeCreateInputRestDto {
  static readonly schema = modalidadeCreateSchema;

  @ApiProperty({ type: "string", description: "Nome da modalidade", minLength: 1 })
  nome: string;

  @ApiProperty({ type: "string", description: "Apelido da modalidade", minLength: 1 })
  slug: string;
}

@ApiSchema({ name: "ModalidadeUpdateInputDto" })
export class ModalidadeUpdateInputRestDto extends PartialType(ModalidadeCreateInputRestDto) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "ModalidadeFindOneInputDto" })
export class ModalidadeFindOneInputRestDto {
  static readonly schema = modalidadeFindOneInputSchema;

  @ApiProperty({
    type: "string",
    description: "Identificador do registro (uuid)",
    format: "uuid",
  })
  id: string;
}
