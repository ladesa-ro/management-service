import { ArgsType, Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsOptional, IsString, MinLength, ValidateNested } from "class-validator";
import { decorate } from "ts-mixer";
import {
  EnderecoFindOneOutputGraphQlDto,
  EnderecoInputGraphQlDto,
} from "@/modules/localidades/endereco/presentation/graphql/endereco.graphql.dto";
import {
  EntityBaseGraphQlDto,
  PaginatedFilterByIdGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/modules/@shared/infrastructure/graphql/dtos";
import { CampusFieldsMixin } from "../campus.validation-mixin";

// ============================================================================
// FindOne Output
// ============================================================================

@decorate(ObjectType("CampusFindOneOutputDto"))
export class CampusFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @decorate(Field(() => String)) nomeFantasia: string;
  @decorate(Field(() => String)) razaoSocial: string;
  @decorate(Field(() => String)) apelido: string;
  @decorate(Field(() => String)) cnpj: string;
  @decorate(Field(() => EnderecoFindOneOutputGraphQlDto)) endereco: EnderecoFindOneOutputGraphQlDto;
}

// ============================================================================
// Create Input
// ============================================================================

@decorate(InputType("CampusCreateInputDto"))
export class CampusCreateInputGraphQlDto extends CampusFieldsMixin {
  @decorate(Field(() => String)) declare nomeFantasia: string;
  @decorate(Field(() => String)) declare razaoSocial: string;
  @decorate(Field(() => String)) declare apelido: string;
  @decorate(Field(() => String)) declare cnpj: string;
  @decorate(Field(() => EnderecoInputGraphQlDto))
  @decorate(ValidateNested())
  endereco: EnderecoInputGraphQlDto;
}

// ============================================================================
// Update Input
// ============================================================================

@decorate(InputType("CampusUpdateInputDto"))
export class CampusUpdateInputGraphQlDto {
  @decorate(Field(() => String, { nullable: true }))
  @decorate(IsOptional())
  @decorate(IsString())
  @decorate(MinLength(1))
  nomeFantasia?: string;
  @decorate(Field(() => String, { nullable: true }))
  @decorate(IsOptional())
  @decorate(IsString())
  @decorate(MinLength(1))
  razaoSocial?: string;
  @decorate(Field(() => String, { nullable: true }))
  @decorate(IsOptional())
  @decorate(IsString())
  @decorate(MinLength(1))
  apelido?: string;
  @decorate(Field(() => String, { nullable: true }))
  @decorate(IsOptional())
  @decorate(IsString())
  @decorate(MinLength(1))
  cnpj?: string;
  @decorate(Field(() => EnderecoInputGraphQlDto, { nullable: true }))
  @decorate(IsOptional())
  @decorate(ValidateNested())
  endereco?: EnderecoInputGraphQlDto;
}

// ============================================================================
// List Input (GraphQL-compatible - no dots in field names)
// ============================================================================

@decorate(ArgsType())
export class CampusListInputGraphQlDto extends PaginatedFilterByIdGraphQlDto {}

// ============================================================================
// List Output
// ============================================================================

@decorate(ObjectType("CampusListResult"))
export class CampusListOutputGraphQlDto {
  @decorate(Field(() => PaginationMetaGraphQlDto))
  meta: PaginationMetaGraphQlDto;

  @decorate(Field(() => [CampusFindOneOutputGraphQlDto]))
  data: CampusFindOneOutputGraphQlDto[];
}
