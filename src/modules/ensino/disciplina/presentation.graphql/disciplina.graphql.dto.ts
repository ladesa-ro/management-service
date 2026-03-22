import {
  EntityBaseGraphQlDto,
  PaginatedFilterByIdGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/infrastructure.graphql/dtos";
import { ImagemFindOneOutputGraphQlDto } from "@/modules/armazenamento/imagem-arquivo/presentation.graphql/imagem-arquivo.graphql.dto";
import { ArgsType, Field, InputType, Int, ObjectType } from "@/shared/presentation/graphql";
import {
  disciplinaCreateSchema,
  disciplinaGraphqlListInputSchema,
  disciplinaUpdateSchema,
} from "../domain/disciplina.schemas";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("DisciplinaFindOneOutputDto")
export class DisciplinaFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @Field(() => String) nome: string;
  @Field(() => String) nomeAbreviado: string;
  @Field(() => Int) cargaHoraria: number;
  @Field(() => ImagemFindOneOutputGraphQlDto, { nullable: true })
  imagemCapa: ImagemFindOneOutputGraphQlDto | null;
}

// ============================================================================
// Create Input
// ============================================================================

@InputType("DisciplinaImagemCapaRefInputDto")
export class DisciplinaImagemCapaRefInputGraphQlDto {
  @Field(() => String) id: string;
}

@InputType("DisciplinaCreateInputDto")
export class DisciplinaCreateInputGraphQlDto {
  static readonly schema = disciplinaCreateSchema;

  @Field(() => String) nome: string;
  @Field(() => String) nomeAbreviado: string;
  @Field(() => Int) cargaHoraria: number;
  @Field(() => DisciplinaImagemCapaRefInputGraphQlDto, { nullable: true })
  imagemCapa?: DisciplinaImagemCapaRefInputGraphQlDto | null;
}

// ============================================================================
// Update Input
// ============================================================================

@InputType("DisciplinaUpdateInputDto")
export class DisciplinaUpdateInputGraphQlDto {
  static readonly schema = disciplinaUpdateSchema;

  @Field(() => String, { nullable: true })
  nome?: string;
  @Field(() => String, { nullable: true })
  nomeAbreviado?: string;
  @Field(() => Int, { nullable: true })
  cargaHoraria?: number;
  @Field(() => DisciplinaImagemCapaRefInputGraphQlDto, { nullable: true })
  imagemCapa?: DisciplinaImagemCapaRefInputGraphQlDto | null;
}

// ============================================================================
// List Input
// ============================================================================

@ArgsType()
export class DisciplinaListInputGraphQlDto extends PaginatedFilterByIdGraphQlDto {
  static schema = disciplinaGraphqlListInputSchema;

  @Field(() => [String], { nullable: true, description: "Filtro por ID dos Diários" })
  filterDiariosId?: string[];
}

// ============================================================================
// List Output
// ============================================================================

@ObjectType("DisciplinaListResult")
export class DisciplinaListOutputGraphQlDto {
  @Field(() => PaginationMetaGraphQlDto)
  meta: PaginationMetaGraphQlDto;

  @Field(() => [DisciplinaFindOneOutputGraphQlDto])
  data: DisciplinaFindOneOutputGraphQlDto[];
}
