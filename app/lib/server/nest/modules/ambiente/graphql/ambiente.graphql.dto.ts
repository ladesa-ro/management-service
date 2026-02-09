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
import { PaginationArgsGraphQlDto } from "@/modules/@shared/infrastructure/graphql/dtos/pagination-graphql.dto";
import { BlocoFindOneOutputGraphQlDto } from "@/server/nest/modules/bloco/graphql/bloco.graphql.dto";
import { ImagemFindOneOutputGraphQlDto } from "@/server/nest/modules/imagem-arquivo/graphql/imagem-arquivo.graphql.dto";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("AmbienteFindOneOutputDto")
export class AmbienteFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @Field() nome: string;
  @Field(() => String, { nullable: true }) descricao: string | null;
  @Field() codigo: string;
  @Field(() => Int, { nullable: true }) capacidade: number | null;
  @Field(() => String, { nullable: true }) tipo: string | null;
  @Field(() => BlocoFindOneOutputGraphQlDto) bloco: BlocoFindOneOutputGraphQlDto;
  @Field(() => ImagemFindOneOutputGraphQlDto, { nullable: true })
  imagemCapa: ImagemFindOneOutputGraphQlDto | null;
}

// ============================================================================
// Ref Input
// ============================================================================

@InputType("AmbienteRefInputDto")
export class AmbienteRefInputGraphQlDto {
  @Field() @IsString() id: string;
}

// ============================================================================
// Create Input
// ============================================================================

@InputType("AmbienteCreateInputDto")
export class AmbienteCreateInputGraphQlDto {
  @Field() @IsString() @MinLength(1) nome: string;
  @Field({ nullable: true }) @IsOptional() @IsString() descricao?: string | null;
  @Field() @IsString() @MinLength(1) codigo: string;
  @Field(() => Int, { nullable: true }) @IsOptional() @IsInt() capacidade?: number | null;
  @Field({ nullable: true }) @IsOptional() @IsString() tipo?: string | null;
  @Field(() => AmbienteRefInputGraphQlDto) @ValidateNested() bloco: AmbienteRefInputGraphQlDto;
}

// ============================================================================
// Update Input
// ============================================================================

@InputType("AmbienteUpdateInputDto")
export class AmbienteUpdateInputGraphQlDto {
  @Field({ nullable: true }) @IsOptional() @IsString() @MinLength(1) nome?: string;
  @Field({ nullable: true }) @IsOptional() @IsString() descricao?: string | null;
  @Field({ nullable: true }) @IsOptional() @IsString() @MinLength(1) codigo?: string;
  @Field(() => Int, { nullable: true }) @IsOptional() @IsInt() capacidade?: number | null;
  @Field({ nullable: true }) @IsOptional() @IsString() tipo?: string | null;
  @Field(() => AmbienteRefInputGraphQlDto, { nullable: true })
  @IsOptional()
  @ValidateNested()
  bloco?: AmbienteRefInputGraphQlDto;
}

// ============================================================================
// List Input (GraphQL-compatible - no dots in field names)
// ============================================================================

@ArgsType()
export class AmbienteListInputGraphQlDto extends PaginationArgsGraphQlDto {
  @Field(() => [String], { nullable: true, description: "Filtro por ID" })
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  filterId?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por ID do Bloco" })
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  filterBlocoId?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por ID do Campus do Bloco" })
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  filterBlocoCampusId?: string[];
}

// ============================================================================
// List Output
// ============================================================================

@ObjectType("AmbienteListResult")
export class AmbienteListOutputGraphQlDto {
  @Field(() => PaginationMetaGraphQlDto)
  meta: PaginationMetaGraphQlDto;

  @Field(() => [AmbienteFindOneOutputGraphQlDto])
  data: AmbienteFindOneOutputGraphQlDto[];
}
