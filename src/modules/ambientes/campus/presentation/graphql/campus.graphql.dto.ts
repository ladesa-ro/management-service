import {
  EntityBaseGraphQlDto,
  PaginatedFilterByIdGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/modules/@shared/infrastructure/graphql/dtos";
import { ArgsType, Field, InputType, ObjectType } from "@/modules/@shared/presentation/graphql";
import {
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from "@/modules/@shared/presentation/shared";
import {
  EnderecoFindOneOutputGraphQlDto,
  EnderecoInputGraphQlDto,
} from "@/modules/localidades/endereco/presentation/graphql/endereco.graphql.dto";
import { CampusFieldsMixin } from "../campus.validation-mixin";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("CampusFindOneOutputDto")
export class CampusFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @Field(() => String) nomeFantasia: string;
  @Field(() => String) razaoSocial: string;
  @Field(() => String) apelido: string;
  @Field(() => String) cnpj: string;
  @Field(() => EnderecoFindOneOutputGraphQlDto) endereco: EnderecoFindOneOutputGraphQlDto;
}

// ============================================================================
// Create Input
// ============================================================================

@InputType("CampusCreateInputDto")
export class CampusCreateInputGraphQlDto extends CampusFieldsMixin {
  @Field(() => String) declare nomeFantasia: string;
  @Field(() => String) declare razaoSocial: string;
  @Field(() => String) declare apelido: string;
  @Field(() => String) declare cnpj: string;
  @Field(() => EnderecoInputGraphQlDto)
  @ValidateNested()
  endereco: EnderecoInputGraphQlDto;
}

// ============================================================================
// Update Input
// ============================================================================

@InputType("CampusUpdateInputDto")
export class CampusUpdateInputGraphQlDto {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(1)
  nomeFantasia?: string;
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(1)
  razaoSocial?: string;
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(1)
  apelido?: string;
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(1)
  cnpj?: string;
  @Field(() => EnderecoInputGraphQlDto, { nullable: true })
  @IsOptional()
  @ValidateNested()
  endereco?: EnderecoInputGraphQlDto;
}

// ============================================================================
// List Input (GraphQL-compatible - no dots in field names)
// ============================================================================

@ArgsType()
export class CampusListInputGraphQlDto extends PaginatedFilterByIdGraphQlDto {}

// ============================================================================
// List Output
// ============================================================================

@ObjectType("CampusListResult")
export class CampusListOutputGraphQlDto {
  @Field(() => PaginationMetaGraphQlDto)
  meta: PaginationMetaGraphQlDto;

  @Field(() => [CampusFindOneOutputGraphQlDto])
  data: CampusFindOneOutputGraphQlDto[];
}
