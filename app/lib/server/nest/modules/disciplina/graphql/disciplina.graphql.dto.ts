import { ArgsType, Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import {
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  MinLength,
  ValidateNested,
} from "class-validator";
import {
  EntityBaseGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/modules/@shared/infrastructure/graphql/dtos";
import { PaginationInputGraphQlDto } from "@/modules/@shared/infrastructure/graphql/dtos/pagination-graphql.dto";
import { ImagemFindOneOutputGraphQlDto } from "@/server/nest/modules/imagem-arquivo/graphql/imagem-arquivo.graphql.dto";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("DisciplinaFindOneOutputDto")
export class DisciplinaFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @Field() nome: string;
  @Field() nomeAbreviado: string;
  @Field(() => Int) cargaHoraria: number;
  @Field(() => ImagemFindOneOutputGraphQlDto, { nullable: true })
  imagemCapa: ImagemFindOneOutputGraphQlDto | null;
}

// ============================================================================
// Create Input
// ============================================================================

@InputType("DisciplinaImagemCapaRefInputDto")
export class DisciplinaImagemCapaRefInputGraphQlDto {
  @Field() @IsString() id: string;
}

@InputType("DisciplinaCreateInputDto")
export class DisciplinaCreateInputGraphQlDto {
  @Field() @IsString() @MinLength(1) nome: string;
  @Field() @IsString() @MinLength(1) nomeAbreviado: string;
  @Field(() => Int) @IsInt() @Min(1) cargaHoraria: number;
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
  @Field({ nullable: true }) @IsOptional() @IsString() @MinLength(1) nome?: string;
  @Field({ nullable: true }) @IsOptional() @IsString() @MinLength(1) nomeAbreviado?: string;
  @Field(() => Int, { nullable: true }) @IsOptional() @IsInt() @Min(1) cargaHoraria?: number;
  @Field(() => DisciplinaImagemCapaRefInputGraphQlDto, { nullable: true })
  @IsOptional()
  @ValidateNested()
  imagemCapa?: DisciplinaImagemCapaRefInputGraphQlDto | null;
}

// ============================================================================
// List Input
// ============================================================================

@ArgsType()
export class DisciplinaListInputGraphQlDto extends PaginationInputGraphQlDto {
  @Field(() => [String], { nullable: true, description: "Filtro por ID" })
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  filterId?: string[];
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
