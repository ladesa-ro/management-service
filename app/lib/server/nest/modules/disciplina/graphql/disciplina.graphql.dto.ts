import { ArgsType, Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { IsInt, IsOptional, IsString, Min, MinLength, ValidateNested } from "class-validator";
import { decorate } from "ts-mixer";
import {
  EntityBaseGraphQlDto,
  PaginatedFilterByIdGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/modules/@shared/infrastructure/graphql/dtos";
import { ImagemFindOneOutputGraphQlDto } from "@/server/nest/modules/imagem-arquivo/graphql/imagem-arquivo.graphql.dto";
import { DisciplinaFieldsMixin } from "../disciplina.validation-mixin";

// ============================================================================
// FindOne Output
// ============================================================================

@decorate(ObjectType("DisciplinaFindOneOutputDto"))
export class DisciplinaFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @decorate(Field(() => String)) nome: string;
  @decorate(Field(() => String)) nomeAbreviado: string;
  @decorate(Field(() => Int)) cargaHoraria: number;
  @decorate(Field(() => ImagemFindOneOutputGraphQlDto, { nullable: true }))
  imagemCapa: ImagemFindOneOutputGraphQlDto | null;
}

// ============================================================================
// Create Input
// ============================================================================

@decorate(InputType("DisciplinaImagemCapaRefInputDto"))
export class DisciplinaImagemCapaRefInputGraphQlDto {
  @decorate(Field(() => String)) @decorate(IsString()) id: string;
}

@decorate(InputType("DisciplinaCreateInputDto"))
export class DisciplinaCreateInputGraphQlDto extends DisciplinaFieldsMixin {
  @decorate(Field(() => String)) declare nome: string;
  @decorate(Field(() => String)) declare nomeAbreviado: string;
  @decorate(Field(() => Int)) declare cargaHoraria: number;
  @decorate(Field(() => DisciplinaImagemCapaRefInputGraphQlDto, { nullable: true }))
  @decorate(IsOptional())
  @decorate(ValidateNested())
  imagemCapa?: DisciplinaImagemCapaRefInputGraphQlDto | null;
}

// ============================================================================
// Update Input
// ============================================================================

@decorate(InputType("DisciplinaUpdateInputDto"))
export class DisciplinaUpdateInputGraphQlDto {
  @decorate(Field(() => String, { nullable: true }))
  @decorate(IsOptional())
  @decorate(IsString())
  @decorate(MinLength(1))
  nome?: string;
  @decorate(Field(() => String, { nullable: true }))
  @decorate(IsOptional())
  @decorate(IsString())
  @decorate(MinLength(1))
  nomeAbreviado?: string;
  @decorate(Field(() => Int, { nullable: true }))
  @decorate(IsOptional())
  @decorate(IsInt())
  @decorate(Min(1))
  cargaHoraria?: number;
  @decorate(Field(() => DisciplinaImagemCapaRefInputGraphQlDto, { nullable: true }))
  @decorate(IsOptional())
  @decorate(ValidateNested())
  imagemCapa?: DisciplinaImagemCapaRefInputGraphQlDto | null;
}

// ============================================================================
// List Input
// ============================================================================

@decorate(ArgsType())
export class DisciplinaListInputGraphQlDto extends PaginatedFilterByIdGraphQlDto {}

// ============================================================================
// List Output
// ============================================================================

@decorate(ObjectType("DisciplinaListResult"))
export class DisciplinaListOutputGraphQlDto {
  @decorate(Field(() => PaginationMetaGraphQlDto))
  meta: PaginationMetaGraphQlDto;

  @decorate(Field(() => [DisciplinaFindOneOutputGraphQlDto]))
  data: DisciplinaFindOneOutputGraphQlDto[];
}
