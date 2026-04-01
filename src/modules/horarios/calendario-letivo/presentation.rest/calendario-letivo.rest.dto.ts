import {
  CampusFindOneInputRestDto,
  CampusFindOneOutputRestDto,
} from "@/modules/ambientes/campus/presentation.rest";
import {
  OfertaFormacaoFindOneInputRestDto,
  OfertaFormacaoFindOneOutputRestDto,
} from "@/modules/ensino/oferta-formacao/presentation.rest";
import {
  CalendarioLetivoCreateSchema,
  CalendarioLetivoUpdateSchema,
} from "@/modules/horarios/calendario-letivo/domain/calendario-letivo.schemas";
import { CalendarioLetivoFindOneInputSchema } from "@/modules/horarios/calendario-letivo/domain/queries/calendario-letivo-find-one.query.schemas";
import { CalendarioLetivoPaginationInputSchema } from "@/modules/horarios/calendario-letivo/domain/queries/calendario-letivo-list.query.schemas";
import {
  ApiProperty,
  ApiPropertyOptional,
  ApiSchema,
  PartialType,
  TransformToArray,
} from "@/shared/presentation/rest";
import {
  EntityBaseRestDto,
  PaginatedFilterByIdRestDto,
  PaginationMetaRestDto,
} from "@/shared/presentation/rest/dtos";
import { CalendarioLetivoCreateCommandFields } from "../domain/commands/calendario-letivo-create.command";
import { CalendarioLetivoFindOneQueryResultFields } from "../domain/queries/calendario-letivo-find-one.query.result";
import { CalendarioLetivoListQueryFields } from "../domain/queries/calendario-letivo-list.query";

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "CalendarioLetivoFindOneOutputDto" })
export class CalendarioLetivoFindOneOutputRestDto extends EntityBaseRestDto {
  @ApiProperty(CalendarioLetivoFindOneQueryResultFields.nome.swaggerMetadata)
  nome: string;

  @ApiProperty(CalendarioLetivoFindOneQueryResultFields.ano.swaggerMetadata)
  ano: number;

  @ApiProperty({
    type: () => CampusFindOneOutputRestDto,
    ...CalendarioLetivoFindOneQueryResultFields.campus.swaggerMetadata,
  })
  campus: CampusFindOneOutputRestDto;

  @ApiProperty({
    type: () => OfertaFormacaoFindOneOutputRestDto,
    ...CalendarioLetivoFindOneQueryResultFields.ofertaFormacao.swaggerMetadata,
  })
  ofertaFormacao: OfertaFormacaoFindOneOutputRestDto;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ApiSchema({ name: "CalendarioLetivoListInputDto" })
export class CalendarioLetivoListInputRestDto extends PaginatedFilterByIdRestDto {
  static schema = CalendarioLetivoPaginationInputSchema;

  @ApiPropertyOptional(CalendarioLetivoListQueryFields.filterAno.swaggerMetadata)
  @TransformToArray()
  "filter.ano"?: string[];

  @ApiPropertyOptional(CalendarioLetivoListQueryFields.filterCampusId.swaggerMetadata)
  @TransformToArray()
  "filter.campus.id"?: string[];

  @ApiPropertyOptional(CalendarioLetivoListQueryFields.filterOfertaFormacaoId.swaggerMetadata)
  @TransformToArray()
  "filter.ofertaFormacao.id"?: string[];
}

@ApiSchema({ name: "CalendarioLetivoListOutputDto" })
export class CalendarioLetivoListOutputRestDto {
  @ApiProperty({
    type: () => PaginationMetaRestDto,
    ...CalendarioLetivoListQueryFields.meta.swaggerMetadata,
  })
  meta: PaginationMetaRestDto;

  @ApiProperty({
    type: () => [CalendarioLetivoFindOneOutputRestDto],
    ...CalendarioLetivoListQueryFields.data.swaggerMetadata,
  })
  data: CalendarioLetivoFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@ApiSchema({ name: "CalendarioLetivoCreateInputDto" })
export class CalendarioLetivoCreateInputRestDto {
  static schema = CalendarioLetivoCreateSchema.presentation;

  @ApiProperty(CalendarioLetivoCreateCommandFields.nome.swaggerMetadata)
  nome: string;

  @ApiProperty(CalendarioLetivoCreateCommandFields.ano.swaggerMetadata)
  ano: number;

  @ApiProperty({
    type: () => CampusFindOneInputRestDto,
    ...CalendarioLetivoCreateCommandFields.campus.swaggerMetadata,
  })
  campus: CampusFindOneInputRestDto;

  @ApiProperty({
    type: () => OfertaFormacaoFindOneInputRestDto,
    ...CalendarioLetivoCreateCommandFields.ofertaFormacao.swaggerMetadata,
  })
  ofertaFormacao: OfertaFormacaoFindOneInputRestDto;
}

@ApiSchema({ name: "CalendarioLetivoUpdateInputDto" })
export class CalendarioLetivoUpdateInputRestDto extends PartialType(
  CalendarioLetivoCreateInputRestDto,
) {
  static schema = CalendarioLetivoUpdateSchema.presentation;
}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "CalendarioLetivoFindOneInputDto" })
export class CalendarioLetivoFindOneInputRestDto {
  static schema = CalendarioLetivoFindOneInputSchema;

  @ApiProperty(CalendarioLetivoFindOneQueryResultFields.id.swaggerMetadata)
  id: string;
}
