import { Mixin } from "ts-mixer";
import {
  EntityBaseRestDto,
  PaginatedFilterByIdRestDto,
  PaginationMetaRestDto,
} from "@/modules/@shared/infrastructure/presentation/rest/dtos";
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
} from "@/modules/@shared/presentation/rest";
import {
  IsArray,
  IsEnum,
  IsOptional,
  IsUUID,
  Type,
  ValidateNested,
} from "@/modules/@shared/presentation/shared";
import {
  ModalidadeFindOneInputRestDto,
  ModalidadeFindOneOutputRestDto,
} from "@/modules/ensino/modalidade/presentation.rest/modalidade.rest.dto";
import { DuracaoPeriodo } from "@/modules/ensino/oferta-formacao/infrastructure.database/typeorm/oferta-formacao.typeorm.entity";
import { OfertaFormacaoFieldsMixin } from "@/modules/ensino/oferta-formacao/presentation.validations/oferta-formacao.validation-mixin";

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "OfertaFormacaoFindOneOutputDto" })
@RegisterModel({
  name: "OfertaFormacaoFindOneOutputDto",
  properties: [
    simpleProperty("id"),
    simpleProperty("nome"),
    simpleProperty("slug"),
    referenceProperty("modalidade", "ModalidadeFindOneOutputDto"),
    ...commonProperties.dated,
  ],
})
export class OfertaFormacaoFindOneOutputRestDto extends Mixin(
  EntityBaseRestDto,
  OfertaFormacaoFieldsMixin,
) {
  @ApiProperty({ type: "string", description: "Nome da oferta de formacao", minLength: 1 })
  declare nome: string;

  @ApiProperty({ type: "string", description: "Apelido da oferta de formacao", minLength: 1 })
  declare slug: string;

  @ApiPropertyOptional({ enum: DuracaoPeriodo, description: "Duracao de cada periodo", nullable: true })
  duracaoPeriodo: DuracaoPeriodo | null;

  @ApiProperty({
    type: () => ModalidadeFindOneOutputRestDto,
    description: "Modalidade da oferta de formacao",
  })
  @ValidateNested()
  @Type(() => ModalidadeFindOneOutputRestDto)
  modalidade: ModalidadeFindOneOutputRestDto;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ApiSchema({ name: "OfertaFormacaoListInputDto" })
export class OfertaFormacaoListInputRestDto extends PaginatedFilterByIdRestDto {
  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    description: "Filtro por ID da Modalidade",
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
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
export class OfertaFormacaoCreateInputRestDto extends OfertaFormacaoFieldsMixin {
  @ApiProperty({ type: "string", description: "Nome da oferta de formacao", minLength: 1 })
  declare nome: string;

  @ApiProperty({ type: "string", description: "Apelido da oferta de formacao", minLength: 1 })
  declare slug: string;

  @ApiPropertyOptional({ enum: DuracaoPeriodo, description: "Duracao de cada periodo", nullable: true })
  @IsOptional()
  @IsEnum(DuracaoPeriodo)
  duracaoPeriodo?: DuracaoPeriodo | null;

  @ApiProperty({
    type: () => ModalidadeFindOneInputRestDto,
    description: "Modalidade da oferta de formacao",
  })
  @ValidateNested()
  @Type(() => ModalidadeFindOneInputRestDto)
  modalidade: ModalidadeFindOneInputRestDto;
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
  @ApiProperty({
    type: "string",
    description: "Identificador do registro (uuid)",
    format: "uuid",
  })
  @IsUUID()
  id: string;
}
