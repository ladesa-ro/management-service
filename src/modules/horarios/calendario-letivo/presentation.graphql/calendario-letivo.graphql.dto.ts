import {
  EntityBaseGraphQlDto,
  PaginatedFilterByIdGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/infrastructure.graphql/dtos";
import { CampusFindOneOutputGraphQlDto } from "@/modules/ambientes/campus/presentation.graphql/campus.graphql.dto";
import { OfertaFormacaoFindOneOutputGraphQlDto } from "@/modules/ensino/oferta-formacao/presentation.graphql/oferta-formacao.graphql.dto";
import {
  calendarioLetivoCreateSchema,
  calendarioLetivoGraphqlListInputSchema,
  calendarioLetivoUpdateSchema,
} from "@/modules/horarios/calendario-letivo/domain/calendario-letivo.schemas";
import { ArgsType, Field, InputType, Int, ObjectType } from "@/shared/presentation/graphql";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("CalendarioLetivoFindOneOutputDto")
export class CalendarioLetivoFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @Field(() => String) nome: string;
  @Field(() => Int) ano: number;
  @Field(() => CampusFindOneOutputGraphQlDto) campus: CampusFindOneOutputGraphQlDto;
  @Field(() => OfertaFormacaoFindOneOutputGraphQlDto)
  ofertaFormacao: OfertaFormacaoFindOneOutputGraphQlDto;
}

// ============================================================================
// Ref Inputs
// ============================================================================

@InputType("CalendarioLetivoCampusRefInputDto")
export class CalendarioLetivoCampusRefInputGraphQlDto {
  @Field(() => String) id: string;
}

@InputType("CalendarioLetivoOfertaFormacaoRefInputDto")
export class CalendarioLetivoOfertaFormacaoRefInputGraphQlDto {
  @Field(() => String) id: string;
}

// ============================================================================
// Create Input
// ============================================================================

@InputType("CalendarioLetivoCreateInputDto")
export class CalendarioLetivoCreateInputGraphQlDto {
  static schema = calendarioLetivoCreateSchema;

  @Field(() => String) nome: string;
  @Field(() => Int) ano: number;
  @Field(() => CalendarioLetivoCampusRefInputGraphQlDto)
  campus: CalendarioLetivoCampusRefInputGraphQlDto;
  @Field(() => CalendarioLetivoOfertaFormacaoRefInputGraphQlDto)
  ofertaFormacao: CalendarioLetivoOfertaFormacaoRefInputGraphQlDto;
}

// ============================================================================
// Update Input
// ============================================================================

@InputType("CalendarioLetivoUpdateInputDto")
export class CalendarioLetivoUpdateInputGraphQlDto {
  static schema = calendarioLetivoUpdateSchema;

  @Field(() => String, { nullable: true })
  nome?: string;
  @Field(() => Int, { nullable: true })
  ano?: number;
  @Field(() => CalendarioLetivoCampusRefInputGraphQlDto, { nullable: true })
  campus?: CalendarioLetivoCampusRefInputGraphQlDto;
  @Field(() => CalendarioLetivoOfertaFormacaoRefInputGraphQlDto, { nullable: true })
  ofertaFormacao?: CalendarioLetivoOfertaFormacaoRefInputGraphQlDto;
}

// ============================================================================
// List Input (GraphQL-compatible - no dots in field names)
// ============================================================================

@ArgsType()
export class CalendarioLetivoListInputGraphQlDto extends PaginatedFilterByIdGraphQlDto {
  static schema = calendarioLetivoGraphqlListInputSchema;

  @Field(() => [String], { nullable: true, description: "Filtro por ID do Campus" })
  filterCampusId?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por ID da Oferta de Formacao" })
  filterOfertaFormacaoId?: string[];
}

// ============================================================================
// List Output
// ============================================================================

@ObjectType("CalendarioLetivoListResult")
export class CalendarioLetivoListOutputGraphQlDto {
  @Field(() => PaginationMetaGraphQlDto)
  meta: PaginationMetaGraphQlDto;

  @Field(() => [CalendarioLetivoFindOneOutputGraphQlDto])
  data: CalendarioLetivoFindOneOutputGraphQlDto[];
}
