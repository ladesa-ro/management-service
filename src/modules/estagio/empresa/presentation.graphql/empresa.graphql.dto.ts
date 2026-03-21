import {
  EntityBaseGraphQlDto,
  PaginatedFilterByIdGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/modules/@shared/infrastructure/graphql/dtos";
import { ArgsType, Field, InputType, ObjectType } from "@/modules/@shared/presentation/graphql";
import {
  IsArray,
  IsEmail,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  MinLength,
} from "@/modules/@shared/presentation/shared";
import { EmpresaFieldsMixin } from "../presentation.validations/empresa.validation-mixin";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("EmpresaFindOneOutputDto")
export class EmpresaFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @Field(() => String) razaoSocial: string;
  @Field(() => String) nomeFantasia: string;
  @Field(() => String) cnpj: string;
  @Field(() => String) telefone: string;
  @Field(() => String) email: string;
  @Field(() => String) idEnderecoFk: string;
  @Field(() => Boolean) ativo: boolean;
}

// ============================================================================
// Create Input
// ============================================================================

@InputType("EmpresaCreateInputDto")
export class EmpresaCreateInputGraphQlDto extends EmpresaFieldsMixin {
  @Field(() => String) declare razaoSocial: string;
  @Field(() => String) declare nomeFantasia: string;
  @Field(() => String) declare cnpj: string;
  @Field(() => String) declare telefone: string;
  @Field(() => String) declare email: string;
  @Field(() => String) declare idEnderecoFk: string;
}

// ============================================================================
// Update Input
// ============================================================================

@InputType("EmpresaUpdateInputDto")
export class EmpresaUpdateInputGraphQlDto {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(1)
  razaoSocial?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(1)
  nomeFantasia?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @Length(14, 14)
  cnpj?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @Length(1, 15)
  telefone?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsEmail()
  email?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsUUID("all")
  idEnderecoFk?: string;
}

// ============================================================================
// List Input (GraphQL-compatible - no dots in field names)
// ============================================================================

@ArgsType()
export class EmpresaListInputGraphQlDto extends PaginatedFilterByIdGraphQlDto {
  @Field(() => [String], { nullable: true, description: "Filtro por CNPJ" })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  filterCnpj?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por nome fantasia" })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  filterNomeFantasia?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por ID de endereço" })
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  filterIdEnderecoFk?: string[];
}

// ============================================================================
// List Output
// ============================================================================

@ObjectType("EmpresaListResult")
export class EmpresaListOutputGraphQlDto {
  @Field(() => PaginationMetaGraphQlDto)
  meta: PaginationMetaGraphQlDto;

  @Field(() => [EmpresaFindOneOutputGraphQlDto])
  data: EmpresaFindOneOutputGraphQlDto[];
}
