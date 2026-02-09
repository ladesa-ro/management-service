import { ArgsType, Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsArray, IsOptional, IsString, IsUUID, MinLength, ValidateNested } from "class-validator";
import {
  EntityBaseGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/modules/@shared/infrastructure/graphql/dtos";
import { PaginationArgsGraphQlDto } from "@/modules/@shared/infrastructure/graphql/dtos/pagination-graphql.dto";
import { AmbienteFindOneOutputGraphQlDto } from "@/server/nest/modules/ambiente/graphql/ambiente.graphql.dto";
import { CursoFindOneOutputGraphQlDto } from "@/server/nest/modules/curso/graphql/curso.graphql.dto";
import { ImagemFindOneOutputGraphQlDto } from "@/server/nest/modules/imagem-arquivo/graphql/imagem-arquivo.graphql.dto";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("TurmaFindOneOutputDto")
export class TurmaFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @Field() periodo: string;
  @Field(() => CursoFindOneOutputGraphQlDto) curso: CursoFindOneOutputGraphQlDto;
  @Field(() => AmbienteFindOneOutputGraphQlDto, { nullable: true })
  ambientePadraoAula: AmbienteFindOneOutputGraphQlDto | null;
  @Field(() => ImagemFindOneOutputGraphQlDto, { nullable: true })
  imagemCapa: ImagemFindOneOutputGraphQlDto | null;
}

// ============================================================================
// Ref Inputs
// ============================================================================

@InputType("TurmaCursoRefInputDto")
export class TurmaCursoRefInputGraphQlDto {
  @Field() @IsString() id: string;
}

@InputType("TurmaAmbienteRefInputDto")
export class TurmaAmbienteRefInputGraphQlDto {
  @Field() @IsString() id: string;
}

@InputType("TurmaImagemCapaRefInputDto")
export class TurmaImagemCapaRefInputGraphQlDto {
  @Field() @IsString() id: string;
}

// ============================================================================
// Create Input
// ============================================================================

@InputType("TurmaCreateInputDto")
export class TurmaCreateInputGraphQlDto {
  @Field() @IsString() @MinLength(1) periodo: string;
  @Field(() => TurmaCursoRefInputGraphQlDto) @ValidateNested() curso: TurmaCursoRefInputGraphQlDto;
  @Field(() => TurmaAmbienteRefInputGraphQlDto, { nullable: true })
  @IsOptional()
  @ValidateNested()
  ambientePadraoAula?: TurmaAmbienteRefInputGraphQlDto | null;
  @Field(() => TurmaImagemCapaRefInputGraphQlDto, { nullable: true })
  @IsOptional()
  @ValidateNested()
  imagemCapa?: TurmaImagemCapaRefInputGraphQlDto | null;
}

// ============================================================================
// Update Input
// ============================================================================

@InputType("TurmaUpdateInputDto")
export class TurmaUpdateInputGraphQlDto {
  @Field({ nullable: true }) @IsOptional() @IsString() @MinLength(1) periodo?: string;
  @Field(() => TurmaCursoRefInputGraphQlDto, { nullable: true })
  @IsOptional()
  @ValidateNested()
  curso?: TurmaCursoRefInputGraphQlDto;
  @Field(() => TurmaAmbienteRefInputGraphQlDto, { nullable: true })
  @IsOptional()
  @ValidateNested()
  ambientePadraoAula?: TurmaAmbienteRefInputGraphQlDto | null;
  @Field(() => TurmaImagemCapaRefInputGraphQlDto, { nullable: true })
  @IsOptional()
  @ValidateNested()
  imagemCapa?: TurmaImagemCapaRefInputGraphQlDto | null;
}

// ============================================================================
// List Input (GraphQL-compatible - no dots in field names)
// ============================================================================

@ArgsType()
export class TurmaListInputGraphQlDto extends PaginationArgsGraphQlDto {
  @Field(() => [String], { nullable: true, description: "Filtro por ID" })
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  filterId?: string[];
}

// ============================================================================
// List Output
// ============================================================================

@ObjectType("TurmaListResult")
export class TurmaListOutputGraphQlDto {
  @Field(() => PaginationMetaGraphQlDto)
  meta: PaginationMetaGraphQlDto;

  @Field(() => [TurmaFindOneOutputGraphQlDto])
  data: TurmaFindOneOutputGraphQlDto[];
}
