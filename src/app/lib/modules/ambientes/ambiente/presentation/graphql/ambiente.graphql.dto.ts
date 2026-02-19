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
import { decorate } from "ts-mixer";
import {
  EntityBaseGraphQlDto,
  PaginatedFilterByIdGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/modules/@shared/infrastructure/graphql/dtos";
import { BlocoFindOneOutputGraphQlDto } from "@/modules/ambientes/bloco/presentation/graphql/bloco.graphql.dto";
import { ImagemFindOneOutputGraphQlDto } from "@/modules/armazenamento/imagem-arquivo/presentation/graphql/imagem-arquivo.graphql.dto";
import { AmbienteFieldsMixin } from "../ambiente.validation-mixin";

// ============================================================================
// FindOne Output
// ============================================================================

@decorate(ObjectType("AmbienteFindOneOutputDto"))
export class AmbienteFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @decorate(Field(() => String)) nome: string;
  @decorate(Field(() => String, { nullable: true })) descricao: string | null;
  @decorate(Field(() => String)) codigo: string;
  @decorate(Field(() => Int, { nullable: true })) capacidade: number | null;
  @decorate(Field(() => String, { nullable: true })) tipo: string | null;
  @decorate(Field(() => BlocoFindOneOutputGraphQlDto)) bloco: BlocoFindOneOutputGraphQlDto;
  @decorate(Field(() => ImagemFindOneOutputGraphQlDto, { nullable: true }))
  imagemCapa: ImagemFindOneOutputGraphQlDto | null;
}

// ============================================================================
// Ref Input
// ============================================================================

@decorate(InputType("AmbienteRefInputDto"))
export class AmbienteRefInputGraphQlDto {
  @decorate(Field(() => String)) @decorate(IsString()) id: string;
}

// ============================================================================
// Create Input
// ============================================================================

@decorate(InputType("AmbienteCreateInputDto"))
export class AmbienteCreateInputGraphQlDto extends AmbienteFieldsMixin {
  @decorate(Field(() => String)) declare nome: string;
  @decorate(Field(() => String, { nullable: true })) declare descricao?: string | null;
  @decorate(Field(() => String)) declare codigo: string;
  @decorate(Field(() => Int, { nullable: true })) declare capacidade?: number | null;
  @decorate(Field(() => String, { nullable: true })) declare tipo?: string | null;
  @decorate(Field(() => AmbienteRefInputGraphQlDto))
  @decorate(ValidateNested())
  bloco: AmbienteRefInputGraphQlDto;
}

// ============================================================================
// Update Input
// ============================================================================

@decorate(InputType("AmbienteUpdateInputDto"))
export class AmbienteUpdateInputGraphQlDto {
  @decorate(Field(() => String, { nullable: true }))
  @decorate(IsOptional())
  @decorate(IsString())
  @decorate(MinLength(1))
  nome?: string;
  @decorate(Field(() => String, { nullable: true }))
  @decorate(IsOptional())
  @decorate(IsString())
  descricao?: string | null;
  @decorate(Field(() => String, { nullable: true }))
  @decorate(IsOptional())
  @decorate(IsString())
  @decorate(MinLength(1))
  codigo?: string;
  @decorate(Field(() => Int, { nullable: true }))
  @decorate(IsOptional())
  @decorate(IsInt())
  capacidade?: number | null;
  @decorate(Field(() => String, { nullable: true }))
  @decorate(IsOptional())
  @decorate(IsString())
  tipo?: string | null;
  @decorate(Field(() => AmbienteRefInputGraphQlDto, { nullable: true }))
  @decorate(IsOptional())
  @decorate(ValidateNested())
  bloco?: AmbienteRefInputGraphQlDto;
}

// ============================================================================
// List Input (GraphQL-compatible - no dots in field names)
// ============================================================================

@decorate(ArgsType())
export class AmbienteListInputGraphQlDto extends PaginatedFilterByIdGraphQlDto {
  @decorate(Field(() => [String], { nullable: true, description: "Filtro por ID do Bloco" }))
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsUUID(undefined, { each: true }))
  filterBlocoId?: string[];

  @decorate(
    Field(() => [String], { nullable: true, description: "Filtro por ID do Campus do Bloco" }),
  )
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsUUID(undefined, { each: true }))
  filterBlocoCampusId?: string[];
}

// ============================================================================
// List Output
// ============================================================================

@decorate(ObjectType("AmbienteListResult"))
export class AmbienteListOutputGraphQlDto {
  @decorate(Field(() => PaginationMetaGraphQlDto))
  meta: PaginationMetaGraphQlDto;

  @decorate(Field(() => [AmbienteFindOneOutputGraphQlDto]))
  data: AmbienteFindOneOutputGraphQlDto[];
}
