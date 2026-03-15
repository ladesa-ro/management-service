import {
  EntityBaseGraphQlDto,
  PaginatedFilterByIdGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/modules/@shared/infrastructure/graphql/dtos";
import {
  ArgsType,
  Field,
  InputType,
  Int,
  ObjectType,
} from "@/modules/@shared/presentation/graphql";
import {
  IsInt,
  IsArray,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  MinLength,
  ValidateNested,
} from "@/modules/@shared/presentation/shared";
import { ImagemFindOneOutputGraphQlDto } from "@/modules/armazenamento/imagem-arquivo/presentation.graphql/imagem-arquivo.graphql.dto";
import { DisciplinaFieldsMixin } from "../presentation.validations/disciplina.validation-mixin";

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
  @Field(() => String) @IsString() id: string;
}

@InputType("DisciplinaCreateInputDto")
export class DisciplinaCreateInputGraphQlDto extends DisciplinaFieldsMixin {
  @Field(() => String) declare nome: string;
  @Field(() => String) declare nomeAbreviado: string;
  @Field(() => Int) declare cargaHoraria: number;
  @Field(() => DisciplinaImagemCapaRefInputGraphQlDto, { nullable: true })
  @IsOptional()
  @ValidateNested()
  imagemCapa?: DisciplinaImagemCapaRefInputGraphQlDto | null;
}

// ============================================================================
// Update Input
// ============================================================================

@InputType("DisciplinaUpdateInputDto")
export class DisciplinaUpdateInputGraphQlDto {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(1)
  nome?: string;
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(1)
  nomeAbreviado?: string;
  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(1)
  cargaHoraria?: number;
  @Field(() => DisciplinaImagemCapaRefInputGraphQlDto, { nullable: true })
  @IsOptional()
  @ValidateNested()
  imagemCapa?: DisciplinaImagemCapaRefInputGraphQlDto | null;
}

// ============================================================================
// List Input
// ============================================================================

@ArgsType()
export class DisciplinaListInputGraphQlDto extends PaginatedFilterByIdGraphQlDto {
  @Field(() => [String], { nullable: true, description: "Filtro por ID dos Diários" })
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
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
