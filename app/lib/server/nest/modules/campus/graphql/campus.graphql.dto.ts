import { ArgsType, Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import {
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  MinLength,
  ValidateNested,
} from "class-validator";
import {
  EntityBaseGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/modules/@shared/infrastructure/graphql/dtos";
import {
  EnderecoFindOneOutputGraphQlDto,
  EnderecoInputGraphQlDto,
} from "@/server/nest/modules/endereco/graphql/endereco.graphql.dto";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("CampusFindOneOutputDto")
export class CampusFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @Field() nomeFantasia: string;
  @Field() razaoSocial: string;
  @Field() apelido: string;
  @Field() cnpj: string;
  @Field(() => EnderecoFindOneOutputGraphQlDto) endereco: EnderecoFindOneOutputGraphQlDto;
}

// ============================================================================
// Create Input
// ============================================================================

@InputType("CampusCreateInputDto")
export class CampusCreateInputGraphQlDto {
  @Field() @IsString() @MinLength(1) nomeFantasia: string;
  @Field() @IsString() @MinLength(1) razaoSocial: string;
  @Field() @IsString() @MinLength(1) apelido: string;
  @Field() @IsString() @MinLength(1) cnpj: string;
  @Field(() => EnderecoInputGraphQlDto) @ValidateNested() endereco: EnderecoInputGraphQlDto;
}

// ============================================================================
// Update Input
// ============================================================================

@InputType("CampusUpdateInputDto")
export class CampusUpdateInputGraphQlDto {
  @Field({ nullable: true }) @IsOptional() @IsString() @MinLength(1) nomeFantasia?: string;
  @Field({ nullable: true }) @IsOptional() @IsString() @MinLength(1) razaoSocial?: string;
  @Field({ nullable: true }) @IsOptional() @IsString() @MinLength(1) apelido?: string;
  @Field({ nullable: true }) @IsOptional() @IsString() @MinLength(1) cnpj?: string;
  @Field(() => EnderecoInputGraphQlDto, { nullable: true })
  @IsOptional()
  @ValidateNested()
  endereco?: EnderecoInputGraphQlDto;
}

// ============================================================================
// List Input (GraphQL-compatible - no dots in field names)
// ============================================================================

@ArgsType()
export class CampusListInputGraphQlDto {
  @Field(() => Int, { nullable: true, defaultValue: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number = 1;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  search?: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  sortBy?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por ID" })
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  filterId?: string[];
}

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
