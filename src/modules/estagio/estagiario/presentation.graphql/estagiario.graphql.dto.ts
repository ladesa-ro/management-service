import {
  EntityBaseGraphQlDto,
  PaginatedFilterByIdGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/infrastructure.graphql/dtos";
import { PerfilFindOneOutputGraphQlDto } from "@/modules/acesso/usuario/perfil/presentation.graphql/perfil.graphql.dto";
import { CursoFindOneOutputGraphQlDto } from "@/modules/ensino/curso/presentation.graphql/curso.graphql.dto";
import { EstagiarioCreateCommandFields } from "@/modules/estagio/estagiario/domain/commands/estagiario-create.command";
import { EstagiarioUpdateCommandFields } from "@/modules/estagio/estagiario/domain/commands/estagiario-update.command";
import {
  EstagiarioCreateSchema,
  EstagiarioUpdateSchema,
} from "@/modules/estagio/estagiario/domain/estagiario.schemas";
import { EstagiarioFindOneQueryResultFields } from "@/modules/estagio/estagiario/domain/queries/estagiario-find-one.query.result";
import { EstagiarioListQueryFields } from "@/modules/estagio/estagiario/domain/queries/estagiario-list.query";
import { EstagiarioGraphqlListInputSchema } from "@/modules/estagio/estagiario/domain/queries/estagiario-list.query.schemas";
import { ArgsType, Field, InputType, ObjectType } from "@/shared/presentation/graphql";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("EstagiarioFindOneOutputDto")
export class EstagiarioFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @Field(() => PerfilFindOneOutputGraphQlDto, {
    nullable: true,
    ...EstagiarioFindOneQueryResultFields.perfil.gqlMetadata,
  })
  perfil: PerfilFindOneOutputGraphQlDto | null;

  @Field(() => CursoFindOneOutputGraphQlDto, {
    nullable: true,
    ...EstagiarioFindOneQueryResultFields.curso.gqlMetadata,
  })
  curso: CursoFindOneOutputGraphQlDto | null;

  @Field(() => String, EstagiarioFindOneQueryResultFields.periodo.gqlMetadata)
  periodo: string;

  @Field(() => String, EstagiarioFindOneQueryResultFields.telefone.gqlMetadata)
  telefone: string;

  @Field(() => String, {
    nullable: true,
    ...EstagiarioFindOneQueryResultFields.emailInstitucional.gqlMetadata,
  })
  emailInstitucional: string | null;

  @Field(() => String, EstagiarioFindOneQueryResultFields.dataNascimento.gqlMetadata)
  dataNascimento: string;

  @Field(() => Boolean, EstagiarioFindOneQueryResultFields.ativo.gqlMetadata)
  ativo: boolean;
}

// ============================================================================
// Ref Inputs
// ============================================================================

@InputType("EstagiarioPerfilRefInputDto")
export class EstagiarioPerfilRefInputGraphQlDto {
  @Field(() => String) id: string;
}

@InputType("EstagiarioCursoRefInputDto")
export class EstagiarioCursoRefInputGraphQlDto {
  @Field(() => String) id: string;
}

// ============================================================================
// Create Input
// ============================================================================

@InputType("EstagiarioCreateInputDto")
export class EstagiarioCreateInputGraphQlDto {
  static schema = EstagiarioCreateSchema.domain;

  @Field(() => EstagiarioPerfilRefInputGraphQlDto, EstagiarioCreateCommandFields.perfil.gqlMetadata)
  perfil: EstagiarioPerfilRefInputGraphQlDto;

  @Field(() => EstagiarioCursoRefInputGraphQlDto, EstagiarioCreateCommandFields.curso.gqlMetadata)
  curso: EstagiarioCursoRefInputGraphQlDto;

  @Field(() => String, EstagiarioCreateCommandFields.periodo.gqlMetadata)
  periodo: string;

  @Field(() => String, EstagiarioCreateCommandFields.telefone.gqlMetadata)
  telefone: string;

  @Field(() => String, EstagiarioCreateCommandFields.emailInstitucional.gqlMetadata)
  emailInstitucional: string;

  @Field(() => String, EstagiarioCreateCommandFields.dataNascimento.gqlMetadata)
  dataNascimento: string;
}

// ============================================================================
// Update Input
// ============================================================================

@InputType("EstagiarioUpdateInputDto")
export class EstagiarioUpdateInputGraphQlDto {
  static schema = EstagiarioUpdateSchema.domain;

  @Field(() => EstagiarioPerfilRefInputGraphQlDto, {
    nullable: true,
    ...EstagiarioUpdateCommandFields.perfil.gqlMetadata,
  })
  perfil?: EstagiarioPerfilRefInputGraphQlDto;

  @Field(() => EstagiarioCursoRefInputGraphQlDto, {
    nullable: true,
    ...EstagiarioUpdateCommandFields.curso.gqlMetadata,
  })
  curso?: EstagiarioCursoRefInputGraphQlDto;

  @Field(() => String, { nullable: true, ...EstagiarioUpdateCommandFields.periodo.gqlMetadata })
  periodo?: string;

  @Field(() => String, { nullable: true, ...EstagiarioUpdateCommandFields.telefone.gqlMetadata })
  telefone?: string;

  @Field(() => String, {
    nullable: true,
    ...EstagiarioUpdateCommandFields.emailInstitucional.gqlMetadata,
  })
  emailInstitucional?: string;

  @Field(() => String, {
    nullable: true,
    ...EstagiarioUpdateCommandFields.dataNascimento.gqlMetadata,
  })
  dataNascimento?: string;
}

// ============================================================================
// List Input (GraphQL-compatible - no dots in field names)
// ============================================================================

@ArgsType()
export class EstagiarioListInputGraphQlDto extends PaginatedFilterByIdGraphQlDto {
  static schema = EstagiarioGraphqlListInputSchema;

  @Field(() => [String], EstagiarioListQueryFields.filterPerfilId.gqlMetadata)
  filterPerfilId?: string[];

  @Field(() => [String], EstagiarioListQueryFields.filterCursoId.gqlMetadata)
  filterCursoId?: string[];

  @Field(() => [String], EstagiarioListQueryFields.filterPeriodo.gqlMetadata)
  filterPeriodo?: string[];
}

// ============================================================================
// List Output
// ============================================================================

@ObjectType("EstagiarioListResult")
export class EstagiarioListOutputGraphQlDto {
  @Field(() => PaginationMetaGraphQlDto, EstagiarioListQueryFields.meta.gqlMetadata)
  meta: PaginationMetaGraphQlDto;

  @Field(() => [EstagiarioFindOneOutputGraphQlDto], EstagiarioListQueryFields.data.gqlMetadata)
  data: EstagiarioFindOneOutputGraphQlDto[];
}
