import { ModalidadeFindOneOutputRestDto } from "@/modules/ensino/modalidade/presentation.rest/modalidade.rest.dto";
import { DuracaoPeriodo } from "@/modules/ensino/oferta-formacao/infrastructure.database/typeorm/oferta-formacao.typeorm.entity";
import {
  ApiProperty,
  ApiPropertyOptional,
  ApiSchema,
  commonProperties,
  PartialType,
  RegisterModel,
  referenceProperty,
  simpleProperty,
  TransformToArray,
} from "@/shared/presentation/rest";
import {
  EntityBaseRestDto,
  PaginatedFilterByIdRestDto,
  PaginationMetaRestDto,
} from "@/shared/presentation/rest/dtos";
import {
  ofertaFormacaoCreateSchema,
  ofertaFormacaoFindOneInputSchema,
  ofertaFormacaoPaginationInputSchema,
} from "../domain/oferta-formacao.schemas";

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "OfertaFormacaoFindOneOutputDto" })
@RegisterModel({
  name: "OfertaFormacaoFindOneQueryResult",
  properties: [
    simpleProperty("id"),
    simpleProperty("nome"),
    simpleProperty("slug"),
    referenceProperty("modalidade", "ModalidadeFindOneQueryResult"),
    ...commonProperties.dated,
  ],
})
export class OfertaFormacaoFindOneOutputRestDto extends EntityBaseRestDto {
  @ApiProperty({ type: "string", description: "Nome da oferta de formacao", minLength: 1 })
  nome: string;

  @ApiProperty({ type: "string", description: "Apelido da oferta de formacao", minLength: 1 })
  slug: string;

  @ApiPropertyOptional({
    enum: DuracaoPeriodo,
    description: "Duracao de cada periodo",
    nullable: true,
  })
  duracaoPeriodo: DuracaoPeriodo | null;

  @ApiProperty({
    type: () => ModalidadeFindOneOutputRestDto,
    description: "Modalidade da oferta de formacao",
  })
  modalidade: ModalidadeFindOneOutputRestDto;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ApiSchema({ name: "OfertaFormacaoListInputDto" })
export class OfertaFormacaoListInputRestDto extends PaginatedFilterByIdRestDto {
  static schema = ofertaFormacaoPaginationInputSchema;

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    description: "Filtro por ID da Modalidade",
  })
  @TransformToArray()
  "filter.modalidade.id"?: string[];
}

@ApiSchema({ name: "OfertaFormacaoListOutputDto" })
export class OfertaFormacaoListOutputRestDto {
  @ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" })
  meta: PaginationMetaRestDto;

  @ApiProperty({
    type: () => [OfertaFormacaoFindOneOutputRestDto],
    description: "Resultados da busca",
  })
  data: OfertaFormacaoFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@ApiSchema({ name: "OfertaFormacaoCreateInputDto" })
export class OfertaFormacaoCreateInputRestDto {
  static readonly schema = ofertaFormacaoCreateSchema;

  @ApiProperty({ type: "string", description: "Nome da oferta de formacao", minLength: 1 })
  nome: string;

  @ApiProperty({ type: "string", description: "Apelido da oferta de formacao", minLength: 1 })
  slug: string;

  @ApiPropertyOptional({
    enum: DuracaoPeriodo,
    description: "Duracao de cada periodo",
    nullable: true,
  })
  duracaoPeriodo?: DuracaoPeriodo | null;

  @ApiProperty({
    type: "object",
    description: "Modalidade da oferta de formacao",
    properties: { id: { type: "string", format: "uuid" } },
  })
  modalidade: { id: string };
}

@ApiSchema({ name: "OfertaFormacaoUpdateInputDto" })
export class OfertaFormacaoUpdateInputRestDto extends PartialType(
  OfertaFormacaoCreateInputRestDto,
) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "OfertaFormacaoFindOneInputDto" })
export class OfertaFormacaoFindOneInputRestDto {
  static readonly schema = ofertaFormacaoFindOneInputSchema;

  @ApiProperty({
    type: "string",
    description: "Identificador do registro (uuid)",
    format: "uuid",
  })
  id: string;
}
