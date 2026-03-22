import { EntityBaseGraphQlDto, PaginationMetaGraphQlDto } from "@/infrastructure.graphql/dtos";
import { BlocoFindOneOutputGraphQlDto } from "@/modules/ambientes/bloco/presentation.graphql/bloco.graphql.dto";
import { ImagemFindOneOutputGraphQlDto } from "@/modules/armazenamento/imagem-arquivo/presentation.graphql/imagem-arquivo.graphql.dto";
import { ArgsType, Field, InputType, Int, ObjectType } from "@/shared/presentation/graphql";
import {
  ambienteGraphqlListInputSchema,
  ambienteInputCreateSchema,
  ambienteInputUpdateSchema,
} from "../domain/ambiente.schemas";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("AmbienteFindOneOutputDto")
export class AmbienteFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @Field(() => String) nome: string;
  @Field(() => String, { nullable: true }) descricao: string | null;
  @Field(() => String) codigo: string;
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
  @Field(() => String) id: string;
}

// ============================================================================
// Create Input
// ============================================================================

@InputType("AmbienteCreateInputDto")
export class AmbienteCreateInputGraphQlDto {
  static schema = ambienteInputCreateSchema;

  @Field(() => String) nome: string;
  @Field(() => String, { nullable: true }) descricao?: string | null;
  @Field(() => String) codigo: string;
  @Field(() => Int, { nullable: true }) capacidade?: number | null;
  @Field(() => String, { nullable: true }) tipo?: string | null;
  @Field(() => AmbienteRefInputGraphQlDto) bloco: AmbienteRefInputGraphQlDto;
}

// ============================================================================
// Update Input
// ============================================================================

@InputType("AmbienteUpdateInputDto")
export class AmbienteUpdateInputGraphQlDto {
  static schema = ambienteInputUpdateSchema;

  @Field(() => String, { nullable: true }) nome?: string;
  @Field(() => String, { nullable: true }) descricao?: string | null;
  @Field(() => String, { nullable: true }) codigo?: string;
  @Field(() => Int, { nullable: true }) capacidade?: number | null;
  @Field(() => String, { nullable: true }) tipo?: string | null;
  @Field(() => AmbienteRefInputGraphQlDto, { nullable: true })
  bloco?: AmbienteRefInputGraphQlDto;
}

// ============================================================================
// List Input (GraphQL-compatible - no dots in field names)
// ============================================================================

@ArgsType()
export class AmbienteListInputGraphQlDto {
  static schema = ambienteGraphqlListInputSchema;

  @Field(() => Number, { nullable: true, defaultValue: 1 }) page?: number = 1;
  @Field(() => Number, { nullable: true }) limit?: number;
  @Field(() => String, { nullable: true }) search?: string;
  @Field(() => [String], { nullable: true }) sortBy?: string[];
  @Field(() => [String], { nullable: true }) selection?: string[];
  @Field(() => [String], { nullable: true, description: "Filtro por ID" }) filterId?: string[];
  @Field(() => [String], { nullable: true, description: "Filtro por ID do Bloco" })
  filterBlocoId?: string[];
  @Field(() => [String], { nullable: true, description: "Filtro por ID do Campus do Bloco" })
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
