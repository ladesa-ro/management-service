import {
  EntityBaseGraphQlDto,
  PaginatedFilterByIdGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/infrastructure.graphql/dtos";
import { CampusFindOneOutputGraphQlDto } from "@/modules/ambientes/campus/presentation.graphql/campus.graphql.dto";
import { OfertaFormacaoFindOneOutputGraphQlDto } from "@/modules/ensino/oferta-formacao/presentation.graphql/oferta-formacao.graphql.dto";
import {
  CalendarioLetivoCreateSchema,
  CalendarioLetivoUpdateSchema,
} from "@/modules/horarios/calendario-letivo/domain/calendario-letivo.schemas";
import { CalendarioLetivoGraphqlListInputSchema } from "@/modules/horarios/calendario-letivo/domain/queries/calendario-letivo-list.query.schemas";
import { ArgsType, Field, InputType, Int, ObjectType } from "@/shared/presentation/graphql";
import { CalendarioLetivoCreateCommandFields } from "../domain/commands/calendario-letivo-create.command";
import { CalendarioLetivoUpdateCommandFields } from "../domain/commands/calendario-letivo-update.command";
import { CalendarioLetivoFindOneQueryResultFields } from "../domain/queries/calendario-letivo-find-one.query.result";
import { CalendarioLetivoListQueryFields } from "../domain/queries/calendario-letivo-list.query";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("CalendarioLetivoFindOneOutputDto")
export class CalendarioLetivoFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @Field(() => String, CalendarioLetivoFindOneQueryResultFields.nome.gqlMetadata) nome: string;
  @Field(() => Int, CalendarioLetivoFindOneQueryResultFields.ano.gqlMetadata) ano: number;
  @Field(
    () => CampusFindOneOutputGraphQlDto,
    CalendarioLetivoFindOneQueryResultFields.campus.gqlMetadata,
  )
  campus: CampusFindOneOutputGraphQlDto;
  @Field(
    () => OfertaFormacaoFindOneOutputGraphQlDto,
    CalendarioLetivoFindOneQueryResultFields.ofertaFormacao.gqlMetadata,
  )
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
  static schema = CalendarioLetivoCreateSchema.domain;

  @Field(() => String, CalendarioLetivoCreateCommandFields.nome.gqlMetadata) nome: string;
  @Field(() => Int, CalendarioLetivoCreateCommandFields.ano.gqlMetadata) ano: number;
  @Field(
    () => CalendarioLetivoCampusRefInputGraphQlDto,
    CalendarioLetivoCreateCommandFields.campus.gqlMetadata,
  )
  campus: CalendarioLetivoCampusRefInputGraphQlDto;
  @Field(
    () => CalendarioLetivoOfertaFormacaoRefInputGraphQlDto,
    CalendarioLetivoCreateCommandFields.ofertaFormacao.gqlMetadata,
  )
  ofertaFormacao: CalendarioLetivoOfertaFormacaoRefInputGraphQlDto;
}

// ============================================================================
// Update Input
// ============================================================================

@InputType("CalendarioLetivoUpdateInputDto")
export class CalendarioLetivoUpdateInputGraphQlDto {
  static schema = CalendarioLetivoUpdateSchema.domain;

  @Field(() => String, { nullable: true, ...CalendarioLetivoUpdateCommandFields.nome.gqlMetadata })
  nome?: string;
  @Field(() => Int, { nullable: true, ...CalendarioLetivoUpdateCommandFields.ano.gqlMetadata })
  ano?: number;
  @Field(() => CalendarioLetivoCampusRefInputGraphQlDto, {
    nullable: true,
    ...CalendarioLetivoUpdateCommandFields.campus.gqlMetadata,
  })
  campus?: CalendarioLetivoCampusRefInputGraphQlDto;
  @Field(() => CalendarioLetivoOfertaFormacaoRefInputGraphQlDto, {
    nullable: true,
    ...CalendarioLetivoUpdateCommandFields.ofertaFormacao.gqlMetadata,
  })
  ofertaFormacao?: CalendarioLetivoOfertaFormacaoRefInputGraphQlDto;
}

// ============================================================================
// List Input (GraphQL-compatible - no dots in field names)
// ============================================================================

@ArgsType()
export class CalendarioLetivoListInputGraphQlDto extends PaginatedFilterByIdGraphQlDto {
  static schema = CalendarioLetivoGraphqlListInputSchema;

  @Field(() => [String], CalendarioLetivoListQueryFields.filterCampusId.gqlMetadata)
  filterCampusId?: string[];

  @Field(() => [String], CalendarioLetivoListQueryFields.filterOfertaFormacaoId.gqlMetadata)
  filterOfertaFormacaoId?: string[];
}

// ============================================================================
// List Output
// ============================================================================

@ObjectType("CalendarioLetivoListResult")
export class CalendarioLetivoListOutputGraphQlDto {
  @Field(() => PaginationMetaGraphQlDto, CalendarioLetivoListQueryFields.meta.gqlMetadata)
  meta: PaginationMetaGraphQlDto;

  @Field(
    () => [CalendarioLetivoFindOneOutputGraphQlDto],
    CalendarioLetivoListQueryFields.data.gqlMetadata,
  )
  data: CalendarioLetivoFindOneOutputGraphQlDto[];
}
