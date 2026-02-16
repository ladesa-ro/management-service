import { ArgsType, Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsArray, IsOptional, IsString, IsUUID, MinLength, ValidateNested } from "class-validator";
import { decorate } from "ts-mixer";
import {
  EntityBaseGraphQlDto,
  PaginatedFilterByIdGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/modules/@shared/infrastructure/graphql/dtos";
import { ImagemFindOneOutputGraphQlDto } from "@/modules/base/armazenamento/imagem-arquivo/presentation/graphql/imagem-arquivo.graphql.dto";
import { CampusFindOneOutputGraphQlDto } from "@/modules/sisgea/campus/presentation/graphql/campus.graphql.dto";
import { BlocoFieldsMixin } from "../bloco.validation-mixin";

// ============================================================================
// FindOne Output
// ============================================================================

@decorate(ObjectType("BlocoFindOneOutputDto"))
export class BlocoFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @decorate(Field(() => String)) nome: string;
  @decorate(Field(() => String)) codigo: string;
  @decorate(Field(() => CampusFindOneOutputGraphQlDto)) campus: CampusFindOneOutputGraphQlDto;
  @decorate(Field(() => ImagemFindOneOutputGraphQlDto, { nullable: true }))
  imagemCapa: ImagemFindOneOutputGraphQlDto | null;
}

// ============================================================================
// Object UUID Ref Input
// ============================================================================

@decorate(InputType("ObjectUuidRefInputDto"))
export class ObjectUuidRefInputGraphQlDto {
  @decorate(Field(() => String)) @decorate(IsString()) id: string;
}

// ============================================================================
// Create Input
// ============================================================================

@decorate(InputType("BlocoCreateInputDto"))
export class BlocoCreateInputGraphQlDto extends BlocoFieldsMixin {
  @decorate(Field(() => String)) declare nome: string;
  @decorate(Field(() => String)) declare codigo: string;
  @decorate(Field(() => ObjectUuidRefInputGraphQlDto))
  @decorate(ValidateNested())
  campus: ObjectUuidRefInputGraphQlDto;
}

// ============================================================================
// Update Input
// ============================================================================

@decorate(InputType("BlocoUpdateInputDto"))
export class BlocoUpdateInputGraphQlDto {
  @decorate(Field(() => String, { nullable: true }))
  @decorate(IsOptional())
  @decorate(IsString())
  @decorate(MinLength(1))
  nome?: string;
  @decorate(Field(() => String, { nullable: true }))
  @decorate(IsOptional())
  @decorate(IsString())
  @decorate(MinLength(1))
  codigo?: string;
  @decorate(Field(() => ObjectUuidRefInputGraphQlDto, { nullable: true }))
  @decorate(IsOptional())
  @decorate(ValidateNested())
  campus?: ObjectUuidRefInputGraphQlDto;
}

// ============================================================================
// List Input (GraphQL-compatible - no dots in field names)
// ============================================================================

@decorate(ArgsType())
export class BlocoListInputGraphQlDto extends PaginatedFilterByIdGraphQlDto {
  @decorate(Field(() => [String], { nullable: true, description: "Filtro por ID do Campus" }))
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsUUID(undefined, { each: true }))
  filterCampusId?: string[];
}

// ============================================================================
// List Output
// ============================================================================

@decorate(ObjectType("BlocoListResult"))
export class BlocoListOutputGraphQlDto {
  @decorate(Field(() => PaginationMetaGraphQlDto))
  meta: PaginationMetaGraphQlDto;

  @decorate(Field(() => [BlocoFindOneOutputGraphQlDto]))
  data: BlocoFindOneOutputGraphQlDto[];
}
