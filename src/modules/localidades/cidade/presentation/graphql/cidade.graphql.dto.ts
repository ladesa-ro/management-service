import {
  EntityIdIntGraphQlDto,
  PaginatedFilterByIdGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/modules/@shared/infrastructure/graphql/dtos";
import {
  ArgsType,
  Field,
  InputType,
  Int,
  ObjectType,
} from "@/modules/@shared/presentation/graphql";
import {
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
} from "@/modules/@shared/presentation/shared";
import { EstadoFindOneOutputGraphQlDto } from "@/modules/localidades/estado/presentation/graphql/estado.graphql.dto";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("CidadeFindOneOutputDto")
export class CidadeFindOneOutputGraphQlDto extends EntityIdIntGraphQlDto {
  @Field(() => String) nome: string;
  @Field(() => EstadoFindOneOutputGraphQlDto) estado: EstadoFindOneOutputGraphQlDto;
}

// ============================================================================
// FindOne Input (for nested references)
// ============================================================================

@InputType("CidadeFindOneInputDto")
export class CidadeFindOneInputGraphQlDto {
  @Field(() => Int) @IsInt() id: number;
}

// ============================================================================
// List Input (GraphQL-compatible - no dots in field names)
// ============================================================================

@ArgsType()
export class CidadeListInputGraphQlDto extends PaginatedFilterByIdGraphQlDto {
  @Field(() => [String], { nullable: true, description: "Filtro por ID do Estado" })
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  filterEstadoId?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por nome do Estado" })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  filterEstadoNome?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por sigla do Estado" })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  filterEstadoSigla?: string[];
}

// ============================================================================
// List Output
// ============================================================================

@ObjectType("CidadeListResult")
export class CidadeListOutputGraphQlDto {
  @Field(() => PaginationMetaGraphQlDto)
  meta: PaginationMetaGraphQlDto;

  @Field(() => [CidadeFindOneOutputGraphQlDto])
  data: CidadeFindOneOutputGraphQlDto[];
}
