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
import { ModalidadeFindOneOutputGraphQlDto } from "@/modules/ensino/modalidade/presentation.graphql/modalidade.graphql.dto";
import { OfertaFormacaoFieldsMixin } from "@/modules/ensino/oferta-formacao/presentation.validations/oferta-formacao.validation-mixin";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("OfertaFormacaoFindOneOutputDto")
export class OfertaFormacaoFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @Field(() => String) nome: string;
  @Field(() => String) slug: string;
  @Field(() => ModalidadeFindOneOutputGraphQlDto)
  modalidade: ModalidadeFindOneOutputGraphQlDto;
}

// ============================================================================
// Create Input
// ============================================================================

@InputType("OfertaFormacaoModalidadeRefInputDto")
export class OfertaFormacaoModalidadeRefInputGraphQlDto {
  @Field(() => String) @IsString() id: string;
}

@InputType("OfertaFormacaoCreateInputDto")
export class OfertaFormacaoCreateInputGraphQlDto extends OfertaFormacaoFieldsMixin {
  @Field(() => String) declare nome: string;
  @Field(() => String) declare slug: string;
  @Field(() => OfertaFormacaoModalidadeRefInputGraphQlDto)
  @ValidateNested()
  modalidade: OfertaFormacaoModalidadeRefInputGraphQlDto;
}

// ============================================================================
// Update Input
// ============================================================================

@InputType("OfertaFormacaoUpdateInputDto")
export class OfertaFormacaoUpdateInputGraphQlDto {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(1)
  nome?: string;
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(1)
  slug?: string;
  @Field(() => OfertaFormacaoModalidadeRefInputGraphQlDto, { nullable: true })
  @IsOptional()
  @ValidateNested()
  modalidade?: OfertaFormacaoModalidadeRefInputGraphQlDto;
}

// ============================================================================
// List Input
// ============================================================================

@ArgsType()
export class OfertaFormacaoListInputGraphQlDto extends PaginatedFilterByIdGraphQlDto {
  @Field(() => [String], { nullable: true, description: "Filtro por ID da Modalidade" })
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  filterModalidadeId?: string[];
}

// ============================================================================
// List Output
// ============================================================================

@ObjectType("OfertaFormacaoListResult")
export class OfertaFormacaoListOutputGraphQlDto {
  @Field(() => PaginationMetaGraphQlDto)
  meta: PaginationMetaGraphQlDto;

  @Field(() => [OfertaFormacaoFindOneOutputGraphQlDto])
  data: OfertaFormacaoFindOneOutputGraphQlDto[];
}
