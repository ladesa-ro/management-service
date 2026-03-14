import {
  EntityBaseGraphQlDto,
  PaginatedFilterByIdGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/modules/@shared/infrastructure/graphql/dtos";
import { ArgsType, Field, InputType, ObjectType } from "@/modules/@shared/presentation/graphql";
import {
  IsArray,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
  ValidateNested,
} from "@/modules/@shared/presentation/shared";
import { CampusFindOneOutputGraphQlDto } from "@/modules/ambientes/campus/presentation/graphql/campus.graphql.dto";
import { ImagemFindOneOutputGraphQlDto } from "@/modules/armazenamento/imagem-arquivo/presentation/graphql/imagem-arquivo.graphql.dto";
import { BlocoFieldsMixin } from "../bloco.validation-mixin";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("BlocoFindOneOutputDto")
export class BlocoFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @Field(() => String) nome: string;
  @Field(() => String) codigo: string;
  @Field(() => CampusFindOneOutputGraphQlDto) campus: CampusFindOneOutputGraphQlDto;
  @Field(() => ImagemFindOneOutputGraphQlDto, { nullable: true })
  imagemCapa: ImagemFindOneOutputGraphQlDto | null;
}

// ============================================================================
// Object UUID Ref Input
// ============================================================================

@InputType("ObjectUuidRefInputDto")
export class ObjectUuidRefInputGraphQlDto {
  @Field(() => String) @IsString() id: string;
}

// ============================================================================
// Create Input
// ============================================================================

@InputType("BlocoCreateInputDto")
export class BlocoCreateInputGraphQlDto extends BlocoFieldsMixin {
  @Field(() => String) declare nome: string;
  @Field(() => String) declare codigo: string;
  @Field(() => ObjectUuidRefInputGraphQlDto)
  @ValidateNested()
  campus: ObjectUuidRefInputGraphQlDto;
}

// ============================================================================
// Update Input
// ============================================================================

@InputType("BlocoUpdateInputDto")
export class BlocoUpdateInputGraphQlDto {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(1)
  nome?: string;
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(1)
  codigo?: string;
  @Field(() => ObjectUuidRefInputGraphQlDto, { nullable: true })
  @IsOptional()
  @ValidateNested()
  campus?: ObjectUuidRefInputGraphQlDto;
}

// ============================================================================
// List Input (GraphQL-compatible - no dots in field names)
// ============================================================================

@ArgsType()
export class BlocoListInputGraphQlDto extends PaginatedFilterByIdGraphQlDto {
  @Field(() => [String], { nullable: true, description: "Filtro por ID do Campus" })
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  filterCampusId?: string[];
}

// ============================================================================
// List Output
// ============================================================================

@ObjectType("BlocoListResult")
export class BlocoListOutputGraphQlDto {
  @Field(() => PaginationMetaGraphQlDto)
  meta: PaginationMetaGraphQlDto;

  @Field(() => [BlocoFindOneOutputGraphQlDto])
  data: BlocoFindOneOutputGraphQlDto[];
}
