import { ArgsType, Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsArray, IsOptional, IsString, IsUUID, MinLength, ValidateNested } from "class-validator";
import {
  EntityBaseGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/modules/@shared/infrastructure/graphql/dtos";
import { PaginationInputGraphQlDto } from "@/modules/@shared/infrastructure/graphql/dtos/pagination-graphql.dto";
import { ModalidadeFindOneOutputGraphQlDto } from "@/server/nest/modules/modalidade/graphql/modalidade.graphql.dto";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("OfertaFormacaoFindOneOutputDto")
export class OfertaFormacaoFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @Field() nome: string;
  @Field() slug: string;
  @Field(() => ModalidadeFindOneOutputGraphQlDto) modalidade: ModalidadeFindOneOutputGraphQlDto;
}

// ============================================================================
// Create Input
// ============================================================================

@InputType("OfertaFormacaoModalidadeRefInputDto")
export class OfertaFormacaoModalidadeRefInputGraphQlDto {
  @Field() @IsString() id: string;
}

@InputType("OfertaFormacaoCreateInputDto")
export class OfertaFormacaoCreateInputGraphQlDto {
  @Field() @IsString() @MinLength(1) nome: string;
  @Field() @IsString() @MinLength(1) slug: string;
  @Field(() => OfertaFormacaoModalidadeRefInputGraphQlDto)
  @ValidateNested()
  modalidade: OfertaFormacaoModalidadeRefInputGraphQlDto;
}

// ============================================================================
// Update Input
// ============================================================================

@InputType("OfertaFormacaoUpdateInputDto")
export class OfertaFormacaoUpdateInputGraphQlDto {
  @Field({ nullable: true }) @IsOptional() @IsString() @MinLength(1) nome?: string;
  @Field({ nullable: true }) @IsOptional() @IsString() @MinLength(1) slug?: string;
  @Field(() => OfertaFormacaoModalidadeRefInputGraphQlDto, { nullable: true })
  @IsOptional()
  @ValidateNested()
  modalidade?: OfertaFormacaoModalidadeRefInputGraphQlDto;
}

// ============================================================================
// List Input
// ============================================================================

@ArgsType()
export class OfertaFormacaoListInputGraphQlDto extends PaginationInputGraphQlDto {
  @Field(() => [String], { nullable: true, description: "Filtro por ID" })
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  filterId?: string[];

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
