import {
  EntityBaseRestDto,
  PaginatedFilterByIdRestDto,
  PaginationMetaRestDto,
} from "@/modules/@shared/infrastructure/presentation/rest/dtos";
import {
  ApiProperty,
  ApiSchema,
  commonProperties,
  PartialType,
  RegisterModel,
  referenceProperty,
  simpleProperty,
} from "@/modules/@shared/presentation/rest";
import { IsUUID, Type, ValidateNested } from "@/modules/@shared/presentation/shared";
import {
  NivelFormacaoFindOneInputRestDto,
  NivelFormacaoFindOneOutputRestDto,
} from "@/modules/ensino/nivel-formacao/presentation/rest/nivel-formacao.rest.dto";
import {
  OfertaFormacaoFindOneInputRestDto,
  OfertaFormacaoFindOneOutputRestDto,
} from "@/modules/ensino/oferta-formacao/presentation/rest/oferta-formacao.rest.dto";

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "OfertaFormacaoNivelFormacaoFindOneOutputDto" })
@RegisterModel({
  name: "OfertaFormacaoNivelFormacaoFindOneOutputDto",
  properties: [
    simpleProperty("id"),
    referenceProperty("ofertaFormacao", "OfertaFormacaoFindOneOutputDto"),
    referenceProperty("nivelFormacao", "NivelFormacaoFindOneOutputDto"),
    ...commonProperties.dated,
  ],
})
export class OfertaFormacaoNivelFormacaoFindOneOutputRestDto extends EntityBaseRestDto {
  @ApiProperty({
    type: () => OfertaFormacaoFindOneOutputRestDto,
    description: "Oferta de formacao",
  })
  @ValidateNested()
  @Type(() => OfertaFormacaoFindOneOutputRestDto)
  ofertaFormacao: OfertaFormacaoFindOneOutputRestDto;

  @ApiProperty({
    type: () => NivelFormacaoFindOneOutputRestDto,
    description: "Nivel de formacao",
  })
  @ValidateNested()
  @Type(() => NivelFormacaoFindOneOutputRestDto)
  nivelFormacao: NivelFormacaoFindOneOutputRestDto;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ApiSchema({ name: "OfertaFormacaoNivelFormacaoListInputDto" })
export class OfertaFormacaoNivelFormacaoListInputRestDto extends PaginatedFilterByIdRestDto {}

@ApiSchema({ name: "OfertaFormacaoNivelFormacaoListOutputDto" })
export class OfertaFormacaoNivelFormacaoListOutputRestDto {
  @ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" })
  meta: PaginationMetaRestDto;

  @ApiProperty({
    type: () => [OfertaFormacaoNivelFormacaoFindOneOutputRestDto],
    description: "Resultados da busca",
  })
  data: OfertaFormacaoNivelFormacaoFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@ApiSchema({ name: "OfertaFormacaoNivelFormacaoCreateInputDto" })
export class OfertaFormacaoNivelFormacaoCreateInputRestDto {
  @ApiProperty({
    type: () => OfertaFormacaoFindOneInputRestDto,
    description: "Oferta de formacao",
  })
  @ValidateNested()
  @Type(() => OfertaFormacaoFindOneInputRestDto)
  ofertaFormacao: OfertaFormacaoFindOneInputRestDto;

  @ApiProperty({ type: () => NivelFormacaoFindOneInputRestDto, description: "Nivel de formacao" })
  @ValidateNested()
  @Type(() => NivelFormacaoFindOneInputRestDto)
  nivelFormacao: NivelFormacaoFindOneInputRestDto;
}

@ApiSchema({ name: "OfertaFormacaoNivelFormacaoUpdateInputDto" })
export class OfertaFormacaoNivelFormacaoUpdateInputRestDto extends PartialType(
  OfertaFormacaoNivelFormacaoCreateInputRestDto,
) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "OfertaFormacaoNivelFormacaoFindOneInputDto" })
export class OfertaFormacaoNivelFormacaoFindOneInputRestDto {
  @ApiProperty({
    type: "string",
    description: "Identificador do registro (uuid)",
    format: "uuid",
  })
  @IsUUID()
  id: string;
}
