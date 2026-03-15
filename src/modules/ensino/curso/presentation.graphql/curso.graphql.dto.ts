import {
  EntityBaseGraphQlDto,
  PaginatedFilterByIdGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/modules/@shared/infrastructure/graphql/dtos";
import { ArgsType, Field, InputType, ObjectType } from "@/modules/@shared/presentation/graphql";
import {
  IsArray,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
  ValidateNested,
} from "@/modules/@shared/presentation/shared";
import { CampusFindOneOutputGraphQlDto } from "@/modules/ambientes/campus/presentation.graphql/campus.graphql.dto";
import { ImagemFindOneOutputGraphQlDto } from "@/modules/armazenamento/imagem-arquivo/presentation.graphql/imagem-arquivo.graphql.dto";
import { CursoFieldsMixin } from "@/modules/ensino/curso/presentation.validations/curso.validation-mixin";
import { OfertaFormacaoFindOneOutputGraphQlDto } from "@/modules/ensino/oferta-formacao/presentation.graphql/oferta-formacao.graphql.dto";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("CursoFindOneOutputDto")
export class CursoFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @Field(() => String) nome: string;
  @Field(() => String) nomeAbreviado: string;
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
  @Field(() => String) @IsString() id: string;
}

@InputType("CursoOfertaFormacaoRefInputDto")
export class CursoOfertaFormacaoRefInputGraphQlDto {
  @Field(() => String) @IsString() id: string;
}

@InputType("CursoImagemCapaRefInputDto")
export class CursoImagemCapaRefInputGraphQlDto {
  @Field(() => String) @IsString() id: string;
}

@InputType("CursoCreateInputDto")
export class CursoCreateInputGraphQlDto extends CursoFieldsMixin {
  @Field(() => String) declare nome: string;
  @Field(() => String) declare nomeAbreviado: string;
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
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(1)
  nome?: string;
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(1)
  nomeAbreviado?: string;
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
export class CursoListInputGraphQlDto extends PaginatedFilterByIdGraphQlDto {
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
