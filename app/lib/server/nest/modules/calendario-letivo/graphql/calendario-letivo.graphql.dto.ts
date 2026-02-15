import { ArgsType, Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import {
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
  ValidateNested,
} from "class-validator";
import {
  EntityBaseGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/modules/@shared/infrastructure/graphql/dtos";
import { PaginationInputGraphQlDto } from "@/modules/@shared/infrastructure/graphql/dtos/pagination-graphql.dto";
import { CampusFindOneOutputGraphQlDto } from "@/server/nest/modules/campus/graphql/campus.graphql.dto";
import { OfertaFormacaoFindOneOutputGraphQlDto } from "@/server/nest/modules/oferta-formacao/graphql/oferta-formacao.graphql.dto";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("CalendarioLetivoFindOneOutputDto")
export class CalendarioLetivoFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @Field() nome: string;
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
  @Field() @IsString() id: string;
}

@InputType("CalendarioLetivoOfertaFormacaoRefInputDto")
export class CalendarioLetivoOfertaFormacaoRefInputGraphQlDto {
  @Field() @IsString() id: string;
}

// ============================================================================
// Create Input
// ============================================================================

@InputType("CalendarioLetivoCreateInputDto")
export class CalendarioLetivoCreateInputGraphQlDto {
  @Field() @IsString() @MinLength(1) nome: string;
  @Field(() => Int) @IsInt() ano: number;
  @Field(() => CalendarioLetivoCampusRefInputGraphQlDto)
  @ValidateNested()
  campus: CalendarioLetivoCampusRefInputGraphQlDto;
  @Field(() => CalendarioLetivoOfertaFormacaoRefInputGraphQlDto)
  @ValidateNested()
  ofertaFormacao: CalendarioLetivoOfertaFormacaoRefInputGraphQlDto;
}

// ============================================================================
// Update Input
// ============================================================================

@InputType("CalendarioLetivoUpdateInputDto")
export class CalendarioLetivoUpdateInputGraphQlDto {
  @Field({ nullable: true }) @IsOptional() @IsString() @MinLength(1) nome?: string;
  @Field(() => Int, { nullable: true }) @IsOptional() @IsInt() ano?: number;
  @Field(() => CalendarioLetivoCampusRefInputGraphQlDto, { nullable: true })
  @IsOptional()
  @ValidateNested()
  campus?: CalendarioLetivoCampusRefInputGraphQlDto;
  @Field(() => CalendarioLetivoOfertaFormacaoRefInputGraphQlDto, { nullable: true })
  @IsOptional()
  @ValidateNested()
  ofertaFormacao?: CalendarioLetivoOfertaFormacaoRefInputGraphQlDto;
}

// ============================================================================
// List Input (GraphQL-compatible - no dots in field names)
// ============================================================================

@ArgsType()
export class CalendarioLetivoListInputGraphQlDto extends PaginationInputGraphQlDto {
  @Field(() => [String], { nullable: true, description: "Filtro por ID" })
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  filterId?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por ID do Campus" })
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  filterCampusId?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por ID da Oferta de Formacao" })
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
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
