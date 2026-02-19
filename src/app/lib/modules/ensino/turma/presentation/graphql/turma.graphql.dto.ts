import { ArgsType, Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsOptional, IsString, MinLength, ValidateNested } from "class-validator";
import { decorate } from "ts-mixer";
import { ImagemFindOneOutputGraphQlDto } from "@/modules/@base/armazenamento/imagem-arquivo/presentation/graphql/imagem-arquivo.graphql.dto";
import {
  EntityBaseGraphQlDto,
  PaginatedFilterByIdGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/modules/@shared/infrastructure/graphql/dtos";
import { AmbienteFindOneOutputGraphQlDto } from "@/modules/ambientes/ambiente/presentation/graphql/ambiente.graphql.dto";
import { CursoFindOneOutputGraphQlDto } from "@/modules/ensino/curso/presentation/graphql/curso.graphql.dto";
import { TurmaFieldsMixin } from "@/modules/ensino/turma/presentation/turma.validation-mixin";

// ============================================================================
// FindOne Output
// ============================================================================

@decorate(ObjectType("TurmaFindOneOutputDto"))
export class TurmaFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @decorate(Field(() => String)) periodo: string;
  @decorate(Field(() => CursoFindOneOutputGraphQlDto)) curso: CursoFindOneOutputGraphQlDto;
  @decorate(Field(() => AmbienteFindOneOutputGraphQlDto, { nullable: true }))
  ambientePadraoAula: AmbienteFindOneOutputGraphQlDto | null;
  @decorate(Field(() => ImagemFindOneOutputGraphQlDto, { nullable: true }))
  imagemCapa: ImagemFindOneOutputGraphQlDto | null;
}

// ============================================================================
// Ref Inputs
// ============================================================================

@decorate(InputType("TurmaCursoRefInputDto"))
export class TurmaCursoRefInputGraphQlDto {
  @decorate(Field(() => String)) @decorate(IsString()) id: string;
}

@decorate(InputType("TurmaAmbienteRefInputDto"))
export class TurmaAmbienteRefInputGraphQlDto {
  @decorate(Field(() => String)) @decorate(IsString()) id: string;
}

@decorate(InputType("TurmaImagemCapaRefInputDto"))
export class TurmaImagemCapaRefInputGraphQlDto {
  @decorate(Field(() => String)) @decorate(IsString()) id: string;
}

// ============================================================================
// Create Input
// ============================================================================

@decorate(InputType("TurmaCreateInputDto"))
export class TurmaCreateInputGraphQlDto extends TurmaFieldsMixin {
  @decorate(Field(() => String)) declare periodo: string;
  @decorate(Field(() => TurmaCursoRefInputGraphQlDto))
  @decorate(ValidateNested())
  curso: TurmaCursoRefInputGraphQlDto;
  @decorate(Field(() => TurmaAmbienteRefInputGraphQlDto, { nullable: true }))
  @decorate(IsOptional())
  @decorate(ValidateNested())
  ambientePadraoAula?: TurmaAmbienteRefInputGraphQlDto | null;
  @decorate(Field(() => TurmaImagemCapaRefInputGraphQlDto, { nullable: true }))
  @decorate(IsOptional())
  @decorate(ValidateNested())
  imagemCapa?: TurmaImagemCapaRefInputGraphQlDto | null;
}

// ============================================================================
// Update Input
// ============================================================================

@decorate(InputType("TurmaUpdateInputDto"))
export class TurmaUpdateInputGraphQlDto {
  @decorate(Field(() => String, { nullable: true }))
  @decorate(IsOptional())
  @decorate(IsString())
  @decorate(MinLength(1))
  periodo?: string;
  @decorate(Field(() => TurmaCursoRefInputGraphQlDto, { nullable: true }))
  @decorate(IsOptional())
  @decorate(ValidateNested())
  curso?: TurmaCursoRefInputGraphQlDto;
  @decorate(Field(() => TurmaAmbienteRefInputGraphQlDto, { nullable: true }))
  @decorate(IsOptional())
  @decorate(ValidateNested())
  ambientePadraoAula?: TurmaAmbienteRefInputGraphQlDto | null;
  @decorate(Field(() => TurmaImagemCapaRefInputGraphQlDto, { nullable: true }))
  @decorate(IsOptional())
  @decorate(ValidateNested())
  imagemCapa?: TurmaImagemCapaRefInputGraphQlDto | null;
}

// ============================================================================
// List Input (GraphQL-compatible - no dots in field names)
// ============================================================================

@decorate(ArgsType())
export class TurmaListInputGraphQlDto extends PaginatedFilterByIdGraphQlDto {}

// ============================================================================
// List Output
// ============================================================================

@decorate(ObjectType("TurmaListResult"))
export class TurmaListOutputGraphQlDto {
  @decorate(Field(() => PaginationMetaGraphQlDto))
  meta: PaginationMetaGraphQlDto;

  @decorate(Field(() => [TurmaFindOneOutputGraphQlDto]))
  data: TurmaFindOneOutputGraphQlDto[];
}
