import { ArgsType, Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsArray, IsOptional, IsString, IsUUID, MinLength, ValidateNested } from "class-validator";
import {
  EntityBaseGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/modules/@shared/infrastructure/graphql/dtos";
import { PaginationArgsGraphQlDto } from "@/modules/@shared/infrastructure/graphql/dtos/pagination-graphql.dto";
import { CampusFindOneOutputGraphQlDto } from "@/server/nest/modules/campus/graphql/campus.graphql.dto";
import { ImagemFindOneOutputGraphQlDto } from "@/server/nest/modules/imagem-arquivo/graphql/imagem-arquivo.graphql.dto";
import { OfertaFormacaoFindOneOutputGraphQlDto } from "@/server/nest/modules/oferta-formacao/graphql/oferta-formacao.graphql.dto";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("CursoFindOneOutputDto")
export class CursoFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @Field() nome: string;
  @Field() nomeAbreviado: string;
  @Field(() => CampusFindOneOutputGraphQlDto) campus: CampusFindOneOutputGraphQlDto;
  @Field(() => OfertaFormacaoFindOneOutputGraphQlDto)
  ofertaFormacao: OfertaFormacaoFindOneOutputGraphQlDto;
  @Field(() => ImagemFindOneOutputGraphQlDto, { nullable: true })
  imagemCapa: ImagemFindOneOutputGraphQlDto | null;
}

// ============================================================================
// Create Input
// ============================================================================

@InputType("CursoCampusRefInputDto")
export class CursoCampusRefInputGraphQlDto {
  @Field() @IsString() id: string;
}

@InputType("CursoOfertaFormacaoRefInputDto")
export class CursoOfertaFormacaoRefInputGraphQlDto {
  @Field() @IsString() id: string;
}

@InputType("CursoImagemCapaRefInputDto")
export class CursoImagemCapaRefInputGraphQlDto {
  @Field() @IsString() id: string;
}

@InputType("CursoCreateInputDto")
export class CursoCreateInputGraphQlDto {
  @Field() @IsString() @MinLength(1) nome: string;
  @Field() @IsString() @MinLength(1) nomeAbreviado: string;
  @Field(() => CursoCampusRefInputGraphQlDto)
  @ValidateNested()
  campus: CursoCampusRefInputGraphQlDto;
  @Field(() => CursoOfertaFormacaoRefInputGraphQlDto)
  @ValidateNested()
  ofertaFormacao: CursoOfertaFormacaoRefInputGraphQlDto;
  @Field(() => CursoImagemCapaRefInputGraphQlDto, { nullable: true })
  @IsOptional()
  @ValidateNested()
  imagemCapa?: CursoImagemCapaRefInputGraphQlDto | null;
}

// ============================================================================
// Update Input
// ============================================================================

@InputType("CursoUpdateInputDto")
export class CursoUpdateInputGraphQlDto {
  @Field({ nullable: true }) @IsOptional() @IsString() @MinLength(1) nome?: string;
  @Field({ nullable: true }) @IsOptional() @IsString() @MinLength(1) nomeAbreviado?: string;
  @Field(() => CursoCampusRefInputGraphQlDto, { nullable: true })
  @IsOptional()
  @ValidateNested()
  campus?: CursoCampusRefInputGraphQlDto;
  @Field(() => CursoOfertaFormacaoRefInputGraphQlDto, { nullable: true })
  @IsOptional()
  @ValidateNested()
  ofertaFormacao?: CursoOfertaFormacaoRefInputGraphQlDto;
  @Field(() => CursoImagemCapaRefInputGraphQlDto, { nullable: true })
  @IsOptional()
  @ValidateNested()
  imagemCapa?: CursoImagemCapaRefInputGraphQlDto | null;
}

// ============================================================================
// List Input
// ============================================================================

@ArgsType()
export class CursoListInputGraphQlDto extends PaginationArgsGraphQlDto {
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

@ObjectType("CursoListResult")
export class CursoListOutputGraphQlDto {
  @Field(() => PaginationMetaGraphQlDto)
  meta: PaginationMetaGraphQlDto;

  @Field(() => [CursoFindOneOutputGraphQlDto])
  data: CursoFindOneOutputGraphQlDto[];
}
