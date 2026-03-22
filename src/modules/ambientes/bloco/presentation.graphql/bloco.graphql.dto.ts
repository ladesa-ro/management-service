import { EntityBaseGraphQlDto, PaginationMetaGraphQlDto } from "@/infrastructure.graphql/dtos";
import { CampusFindOneOutputGraphQlDto } from "@/modules/ambientes/campus/presentation.graphql/campus.graphql.dto";
import { ImagemFindOneOutputGraphQlDto } from "@/modules/armazenamento/imagem-arquivo/presentation.graphql/imagem-arquivo.graphql.dto";
import { ArgsType, Field, InputType, ObjectType } from "@/shared/presentation/graphql";
import {
  blocoGraphqlListInputSchema,
  blocoInputCreateSchema,
  blocoInputUpdateSchema,
} from "../domain/bloco.schemas";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("BlocoFindOneOutputDto")
export class BlocoFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @Field(() => String) nome: string;
  @Field(() => String) codigo: string;
  @Field(() => CampusFindOneOutputGraphQlDto) campus: CampusFindOneOutputGraphQlDto;
  @Field(() => ImagemFindOneOutputGraphQlDto, { nullable: true })
  imagemCapa: ImagemFindOneOutputGraphQlDto | null;
}

// ============================================================================
// Object UUID Ref Input
// ============================================================================

@InputType("ObjectUuidRefInputDto")
export class ObjectUuidRefInputGraphQlDto {
  @Field(() => String) id: string;
}

// ============================================================================
// Create Input
// ============================================================================

@InputType("BlocoCreateInputDto")
export class BlocoCreateInputGraphQlDto {
  static schema = blocoInputCreateSchema;

  @Field(() => String) nome: string;
  @Field(() => String) codigo: string;
  @Field(() => ObjectUuidRefInputGraphQlDto) campus: ObjectUuidRefInputGraphQlDto;
}

// ============================================================================
// Update Input
// ============================================================================

@InputType("BlocoUpdateInputDto")
export class BlocoUpdateInputGraphQlDto {
  static schema = blocoInputUpdateSchema;

  @Field(() => String, { nullable: true }) nome?: string;
  @Field(() => String, { nullable: true }) codigo?: string;
  @Field(() => ObjectUuidRefInputGraphQlDto, { nullable: true })
  campus?: ObjectUuidRefInputGraphQlDto;
}

// ============================================================================
// List Input (GraphQL-compatible - no dots in field names)
// ============================================================================

@ArgsType()
export class BlocoListInputGraphQlDto {
  static schema = blocoGraphqlListInputSchema;

  @Field(() => Number, { nullable: true, defaultValue: 1 }) page?: number = 1;
  @Field(() => Number, { nullable: true }) limit?: number;
  @Field(() => String, { nullable: true }) search?: string;
  @Field(() => [String], { nullable: true }) sortBy?: string[];
  @Field(() => [String], { nullable: true }) selection?: string[];
  @Field(() => [String], { nullable: true, description: "Filtro por ID" }) filterId?: string[];
  @Field(() => [String], { nullable: true, description: "Filtro por ID do Campus" })
  filterCampusId?: string[];
}

// ============================================================================
// List Output
// ============================================================================

@ObjectType("BlocoListResult")
export class BlocoListOutputGraphQlDto {
  @Field(() => PaginationMetaGraphQlDto)
  meta: PaginationMetaGraphQlDto;

  @Field(() => [BlocoFindOneOutputGraphQlDto])
  data: BlocoFindOneOutputGraphQlDto[];
}
