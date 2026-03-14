import {
  EntityBaseGraphQlDto,
  PaginatedFilterByIdGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/modules/@shared/infrastructure/graphql/dtos";
import { ArgsType, Field, InputType, ObjectType } from "@/modules/@shared/presentation/graphql";
import {
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from "@/modules/@shared/presentation/shared";
import { AmbienteFindOneOutputGraphQlDto } from "@/modules/ambientes/ambiente/presentation/graphql/ambiente.graphql.dto";
import { ImagemFindOneOutputGraphQlDto } from "@/modules/armazenamento/imagem-arquivo/presentation/graphql/imagem-arquivo.graphql.dto";
import { CursoFindOneOutputGraphQlDto } from "@/modules/ensino/curso/presentation/graphql/curso.graphql.dto";
import { TurmaFieldsMixin } from "@/modules/ensino/turma/presentation/turma.validation-mixin";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("TurmaFindOneOutputDto")
export class TurmaFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @Field(() => String) periodo: string;
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
  @Field(() => String) @IsString() id: string;
}

@InputType("TurmaAmbienteRefInputDto")
export class TurmaAmbienteRefInputGraphQlDto {
  @Field(() => String) @IsString() id: string;
}

@InputType("TurmaImagemCapaRefInputDto")
export class TurmaImagemCapaRefInputGraphQlDto {
  @Field(() => String) @IsString() id: string;
}

// ============================================================================
// Create Input
// ============================================================================

@InputType("TurmaCreateInputDto")
export class TurmaCreateInputGraphQlDto extends TurmaFieldsMixin {
  @Field(() => String) declare periodo: string;
  @Field(() => TurmaCursoRefInputGraphQlDto)
  @ValidateNested()
  curso: TurmaCursoRefInputGraphQlDto;
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
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(1)
  periodo?: string;
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
export class TurmaListInputGraphQlDto extends PaginatedFilterByIdGraphQlDto {}

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
